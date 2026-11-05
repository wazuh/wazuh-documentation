import csv
import html
import os
import re
import subprocess
import time
from urllib.request import urlopen

from docutils import nodes
from docutils.parsers.rst import directives
from sphinx.errors import ExtensionError
from sphinx.util import logging
from sphinx.util.docutils import SphinxDirective

logger = logging.getLogger(__name__)

# Builds tables of the fields listed in the fields.csv file of a WCS module: one
# section per field set, or a single table. Values go into the document as plain
# text nodes, never as reStructuredText, so no value is parsed as markup.
MAX_AGE = 60 * 15  # 15 minutes, same as the manager API spec download
COLUMNS = ['Field', 'Type', 'Level', 'Normalization', 'Indexed', 'Example', 'Description']
WIDTHS = [25, 9, 9, 9, 8, 15, 25]
CODE_COLUMNS = COLUMNS[:6]


REPO = 'wazuh/wazuh-indexer-plugins'
MAIN_MODULE = 'stateless/events/main'
# The modules the pages can list, as folders under wcs/ in the repository
MODULES = [
    MAIN_MODULE,
    'stateless/events/findings',
    'stateful/fim/files',
    'stateful/fim/windows-registry-keys',
    'stateful/fim/windows-registry-values',
    'stateful/inventory/browser-extensions',
    'stateful/inventory/groups',
    'stateful/inventory/hardware',
    'stateful/inventory/hotfixes',
    'stateful/inventory/interfaces',
    'stateful/inventory/networks',
    'stateful/inventory/packages',
    'stateful/inventory/ports',
    'stateful/inventory/processes',
    'stateful/inventory/protocols',
    'stateful/inventory/services',
    'stateful/inventory/system',
    'stateful/inventory/users',
    'stateful/sca',
    'stateful/vulnerabilities',
]
# One-sentence descriptions of the field sets that WCS adds. The ECS field sets
# use their short description from the ECS release the CSV declares.
WCS_SET_DESCRIPTIONS = {
    'wazuh': 'Fields Wazuh adds to describe how it collected and processed the event.',
    'check': 'The results of Security Configuration Assessment (SCA) checks, including the condition, the result, the rationale, and the remediation.',
    'policy': 'The SCA policies that group the checks.',
    'compliance': 'The compliance requirements an event relates to.',
    'mitre': 'The MITRE ATT&CK tactics, techniques, and subtechniques an event relates to.',
}
# ECS describes these field sets together, as its tracing field set
ECS_SET_ALIASES = {'span': 'tracing', 'trace': 'tracing', 'transaction': 'tracing'}
RESOLVED = {}


def module_file(module):
    return '/wcs/%s/docs/fields.csv' % module


def cache_path(app, module):
    return os.path.join(app.doctreedir, 'wcs-fields', module.replace('/', '__') + '.csv')


def ref_exists(kind, name):
    result = subprocess.run(
        ['git', 'ls-remote', '--%s' % kind, '--refs', 'https://github.com/%s' % REPO, 'refs/%s/%s' % (kind, name)],
        capture_output=True, text=True, timeout=60, check=True)
    return bool(result.stdout.strip())


def resolve_ref(app):
    ''' The ref the WCS page reads: the wcs_fields_ref setting when set, otherwise
        the tag of the version the documentation declares (release plus the Wazuh
        indexer revision, such as v5.0.0-rc2, or v5.0.0 for a final release),
        otherwise the release branch while that tag doesn't exist yet, otherwise
        main when the repository has no branch for the release either. '''
    if app.config.wcs_fields_ref:
        return app.config.wcs_fields_ref
    release = app.config.release
    revision = app.config.custom_replacements.get('|WAZUH_INDEXER_CURRENT_REV|', '')
    stage = revision if re.fullmatch(r'(alpha|beta|rc)\d+', revision) else ''
    tag = 'v%s%s' % (release, '-' + stage if stage else '')
    try:
        if ref_exists('tags', tag):
            return tag
        if ref_exists('heads', release):
            logger.info('No %s tag %s yet; reading the WCS field reference from the %s branch',
                        REPO, tag, release)
            return release
    except (OSError, subprocess.SubprocessError) as error:
        logger.warning('Could not check the %s refs for %s (%s); using the main branch', REPO, tag, error)
        return 'main'
    logger.info('No %s tag %s or branch %s yet; reading the WCS field reference from the main branch',
                REPO, tag, release)
    return 'main'


def set_ref(app, config):
    ''' Runs before Sphinx compares the configuration with the previous build, so
        an unchanged ref doesn't make every page be read again. '''
    ref = resolve_ref(app)
    RESOLVED['ref'] = ref
    config.custom_replacements['|WCS_FIELDS_PAGE_URL|'] = 'https://github.com/%s/blob/%s%s' % (REPO, ref, module_file(MAIN_MODULE))
    config.custom_replacements['|WCS_REF|'] = ref


def download(app):
    ''' Runs once per build, for every module. Each cached file is rewritten only
        when its content changes, so an incremental build re-reads a page only
        after a real change. '''
    for module in MODULES:
        download_module(app, module)
    download_ecs(app)


def ecs_cache_path(app):
    return os.path.join(app.doctreedir, 'wcs-fields', 'ecs_nested.yml')


def ecs_version(app):
    with open(cache_path(app, MAIN_MODULE), newline='', encoding='utf-8') as csv_file:
        return next(csv.DictReader(csv_file))['ECS_Version']


def download_ecs(app):
    ''' The ECS release the main module is based on, for the short description of
        each ECS field set. Cached for as long as the release doesn't change. '''
    version = ecs_version(app)
    url = 'https://raw.githubusercontent.com/elastic/ecs/v%s/generated/ecs/ecs_nested.yml' % version
    path = ecs_cache_path(app)
    stamp = path + '.stamp'
    try:
        with open(stamp) as stamp_file:
            if stamp_file.read() == version and os.path.exists(path):
                return
    except OSError:
        pass
    try:
        with urlopen(url, timeout=60) as response:
            data = response.read()
    except Exception as error:
        if os.path.exists(path):
            logger.warning('Could not refresh %s (%s); using the cached copy', url, error)
            return
        raise ExtensionError('Could not download the ECS field sets from %s: %s' % (url, error))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as ecs_file:
        ecs_file.write(data)
    with open(stamp, 'w') as stamp_file:
        stamp_file.write(version)


def ecs_set_descriptions(app):
    ''' Maps each ECS field set to its short description. The file lists each field
        set at the top level with a "short" key right below it, so a line scan is
        enough and the build needs no YAML library. '''
    descriptions = {}
    current = None
    collecting = False
    with open(ecs_cache_path(app), encoding='utf-8') as ecs_file:
        for line in ecs_file:
            match = re.match(r'^([a-z_0-9]+):\s*$', line)
            if match:
                current = match.group(1)
                collecting = False
                continue
            match = re.match(r'^  short: (.*)$', line)
            if match and current and current not in descriptions:
                descriptions[current] = match.group(1).strip()
                collecting = True
                continue
            # A long description wraps onto lines indented deeper than its key
            if collecting and re.match(r'^   +\S', line):
                descriptions[current] += ' ' + line.strip()
            else:
                collecting = False
    return descriptions


def download_module(app, module):
    ref = RESOLVED['ref']
    url = 'https://raw.githubusercontent.com/%s/%s%s' % (REPO, ref, module_file(module))
    path = cache_path(app, module)
    # A separate stamp file records when the download last ran and for which ref:
    # touching the CSV itself would make Sphinx read the page again for nothing.
    stamp = path + '.stamp'
    try:
        with open(stamp) as stamp_file:
            stamped_time, stamped_ref = stamp_file.read().split(' ', 1)
        if (time.time() - float(stamped_time) < MAX_AGE and stamped_ref == ref
                and os.path.exists(path)):
            return
    except (OSError, ValueError):
        pass
    try:
        with urlopen(url, timeout=60) as response:
            data = response.read()
    except Exception as error:
        if os.path.exists(path):
            logger.warning('Could not refresh %s (%s); using the cached copy', url, error)
            return
        raise ExtensionError('Could not download the WCS field reference from %s: %s' % (url, error))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    try:
        with open(path, 'rb') as csv_file:
            unchanged = csv_file.read() == data
    except OSError:
        unchanged = False
    if not unchanged:
        with open(path, 'wb') as csv_file:
            csv_file.write(data)
    with open(stamp, 'w') as stamp_file:
        stamp_file.write('%s %s' % (time.time(), ref))


def text_nodes(value):
    ''' Plain text, with each `code` span of the CSV's Markdown shown in code font. '''
    parts = value.split('`')
    if len(parts) % 2 == 0:
        return [nodes.Text(value)]
    return [nodes.literal(part, part) if index % 2 else nodes.Text(part)
            for index, part in enumerate(parts) if part]


def entry(content):
    cell = nodes.entry()
    if content:
        cell += nodes.paragraph('', '', *content)
    return cell


def build_table(rows):
    table = nodes.table(classes=['colwidths-given', 'wcs-fields'])
    tgroup = nodes.tgroup(cols=len(COLUMNS))
    table += tgroup
    for width in WIDTHS:
        tgroup += nodes.colspec(colwidth=width)
    head = nodes.thead()
    head_row = nodes.row()
    for name in COLUMNS:
        head_row += entry([nodes.Text(name)])
    head += head_row
    tgroup += head
    body = nodes.tbody()
    for row in rows:
        body_row = nodes.row()
        for name in COLUMNS:
            value = ' '.join(html.unescape(row[name]).split())
            if not value:
                content = []
            elif name in CODE_COLUMNS:
                content = [nodes.literal(value, value)]
            else:
                content = text_nodes(value)
            body_row += entry(content)
        body += body_row
    tgroup += body
    return table


def name_list(argument):
    ''' Field set names separated by spaces or commas. '''
    names = [name for name in re.split(r'[\s,]+', argument or '') if name]
    if not names:
        raise ValueError('expected one or more field set names')
    return names


def letter_range(argument):
    ''' A range of first letters, such as a-m. '''
    match = re.fullmatch(r'\s*([a-z])\s*-\s*([a-z])\s*', argument or '')
    if not match or match.group(1) > match.group(2):
        raise ValueError('expected a range of first letters, such as a-m')
    return match.group(1), match.group(2)


def prefix_groups(set_name, rows, split_above=120, merge_below=4):
    ''' Splits the rows of one field set by name prefix: wazuh.agent.*, wazuh.rule.*,
        and so on. A group above split_above fields is split one level deeper, and
        groups below merge_below fields join the top-level group of the field set. '''
    def prefix(field, depth):
        parts = field.split('.')
        return '.'.join(parts[:depth]) if len(parts) > depth else None
    counts = {}
    for row in rows:
        key = prefix(row['Field'], 2)
        if key:
            counts[key] = counts.get(key, 0) + 1
    groups = {}
    for row in rows:
        key = prefix(row['Field'], 2) or set_name
        if counts.get(key, 0) > split_above:
            key = prefix(row['Field'], 3) or key
        groups.setdefault(key, []).append(row)
    top = []
    result = []
    for key in sorted(groups):
        if key != set_name and len(groups[key]) < merge_below:
            top.extend(groups[key])
        elif key == set_name:
            top = groups[key] + top
        else:
            result.append((key, groups[key]))
    if top:
        result.insert(0, (set_name, top))
    return result


def module_choice(argument):
    if argument not in MODULES:
        raise ValueError('"%s" is not one of the WCS modules: %s' % (argument, ', '.join(MODULES)))
    return argument


class WCSFieldTables(SphinxDirective):
    ''' The argument is the module whose fields.csv the tables list (the main
        events module when omitted). With the single-table option the fields go
        in one table instead of one section for each field set. The exclude
        option leaves out the fields that another module already lists. '''
    has_content = False
    optional_arguments = 1
    option_spec = {
        'single-table': directives.flag,
        'exclude': module_choice,
        # Only these field sets, or all but these, or those whose name starts with
        # a letter in the range. The options can be combined.
        'field-sets': name_list,
        'exclude-field-sets': name_list,
        'letters': letter_range,
        # Splits each field set into one section per name prefix.
        'group-by-prefix': directives.flag,
        # Each table starts collapsed under its heading (theme accordions).
        'collapsible': directives.flag,
        # A table of the field sets with their description and field counts,
        # instead of the field tables.
        'summary': directives.flag,
    }

    def make_section(self, title):
        section = nodes.section()
        section += nodes.title(title, title)
        section['names'].append(nodes.fully_normalize_name(title))
        section['ids'].append(nodes.make_id(title))
        self.state.document.note_implicit_target(section, section)
        return section

    def read_rows(self, module):
        path = cache_path(self.env.app, module)
        self.env.note_dependency(path)
        with open(path, newline='', encoding='utf-8') as csv_file:
            return list(csv.DictReader(csv_file))

    def body(self, section, children):
        ''' Adds the description and table of a section, inside a collapsible
            container when the collapsible option is set. '''
        if 'collapsible' in self.options:
            container = nodes.container(classes=['accordion-section'])
            container.extend(children)
            section += container
        else:
            section.extend(children)

    def select_sets(self, sets):
        names = sorted(sets)
        if 'field-sets' in self.options:
            wanted = self.options['field-sets']
            for name in wanted:
                if name not in sets:
                    logger.warning('The %s field set is not in the module', name, location=self.get_location())
            names = [name for name in names if name in wanted]
        if 'exclude-field-sets' in self.options:
            names = [name for name in names if name not in self.options['exclude-field-sets']]
        if 'letters' in self.options:
            first, last = self.options['letters']
            names = [name for name in names if first <= name[0] <= last]
        return names

    def summary_table(self, sets, names, describe):
        table = nodes.table(classes=['colwidths-given', 'wcs-fields-summary'])
        tgroup = nodes.tgroup(cols=4)
        table += tgroup
        for width in [20, 60, 10, 10]:
            tgroup += nodes.colspec(colwidth=width)
        head = nodes.thead()
        head_row = nodes.row()
        for name in ['Field set', 'Description', 'Fields', 'Core fields']:
            head_row += entry([nodes.Text(name)])
        head += head_row
        tgroup += head
        body = nodes.tbody()
        for name in names:
            rows = sets[name]
            core = sum(1 for row in rows if row['Level'] == 'core')
            body_row = nodes.row()
            body_row += entry([nodes.literal(name, name)])
            body_row += entry(text_nodes(describe(name) or ''))
            body_row += entry([nodes.Text(str(len(rows)))])
            body_row += entry([nodes.Text(str(core))] if core else [])
            body += body_row
        tgroup += body
        return table

    def run(self):
        module = module_choice(self.arguments[0]) if self.arguments else MAIN_MODULE
        rows = self.read_rows(module)
        if 'exclude' in self.options:
            listed = {row['Field'] for row in self.read_rows(self.options['exclude'])}
            rows = [row for row in rows if row['Field'] not in listed]
        if 'single-table' in self.options:
            return [build_table(rows)]
        sets = {}
        for row in rows:
            sets.setdefault(row['Field_Set'], []).append(row)
        ecs = ecs_set_descriptions(self.env.app)
        self.env.note_dependency(ecs_cache_path(self.env.app))

        def describe(name):
            return WCS_SET_DESCRIPTIONS.get(name) or ecs.get(ECS_SET_ALIASES.get(name, name))

        names = self.select_sets(sets)
        if 'summary' in self.options:
            return [self.summary_table(sets, names, describe)]
        result = []
        for name in names:
            description = describe(name)
            if not description:
                logger.warning('No description for the %s field set', name)
            intro = [nodes.paragraph('', '', nodes.Text(description))] if description else []
            if 'group-by-prefix' in self.options:
                groups = prefix_groups(name, sets[name])
                # A page about one field set lists its groups directly under the page title
                parent = None if len(names) == 1 else self.make_section(name)
                if parent is None:
                    result.extend(intro)
                else:
                    parent.extend(intro)
                for key, group_rows in groups:
                    section = self.make_section(key + '.*')
                    self.body(section, [build_table(group_rows)])
                    if parent is None:
                        result.append(section)
                    else:
                        parent += section
                if parent is not None:
                    result.append(parent)
            else:
                section = self.make_section(name)
                self.body(section, intro + [build_table(sets[name])])
                result.append(section)
        return result


def add_filter_script(app, pagename, templatename, context, doctree):
    ''' Adds the search and filter bar (source/_static/js/wcs-fields.js) only to
        the pages that have WCS field tables. '''
    if doctree and any('wcs-fields' in table['classes'] for table in doctree.findall(nodes.table)):
        app.add_js_file('js/wcs-fields.js')


def setup(app):
    app.add_config_value('wcs_fields_ref', '', 'env')
    app.add_directive('wcs-field-tables', WCSFieldTables)
    app.connect('html-page-context', add_filter_script)
    app.connect('config-inited', set_ref)
    app.connect('builder-inited', download)
    return {'parallel_read_safe': True, 'parallel_write_safe': True}
