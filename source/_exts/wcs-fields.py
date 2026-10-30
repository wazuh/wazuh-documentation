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
    table = nodes.table(classes=['colwidths-given'])
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
        result = []
        for name in sorted(sets):
            section = self.make_section(name)
            description = WCS_SET_DESCRIPTIONS.get(name) or ecs.get(ECS_SET_ALIASES.get(name, name))
            if description:
                section += nodes.paragraph('', '', nodes.Text(description))
            else:
                logger.warning('No description for the %s field set', name)
            section += build_table(sets[name])
            result.append(section)
        return result


def setup(app):
    app.add_config_value('wcs_fields_ref', '', 'env')
    app.add_directive('wcs-field-tables', WCSFieldTables)
    app.connect('config-inited', set_ref)
    app.connect('builder-inited', download)
    return {'parallel_read_safe': True, 'parallel_write_safe': True}
