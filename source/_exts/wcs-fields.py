import csv
import os
import re
import subprocess
import time
from urllib.request import urlopen

from docutils import nodes
from sphinx.errors import ExtensionError
from sphinx.util import logging
from sphinx.util.docutils import SphinxDirective

logger = logging.getLogger(__name__)

# Builds one section per field set, each with a table of that field set's fields
# read from the WCS fields.csv file. Values go into the document as plain text
# nodes, never as reStructuredText, so no value is parsed as markup.
MAX_AGE = 60 * 15  # 15 minutes, same as the manager API spec download
COLUMNS = ['Field', 'Type', 'Level', 'Normalization', 'Indexed', 'Example', 'Description']
WIDTHS = [25, 9, 9, 9, 8, 15, 25]
CODE_COLUMNS = COLUMNS[:6]


REPO = 'wazuh/wazuh-indexer-plugins'
FILE = '/wcs/stateless/events/main/docs/fields.csv'
STAGES = {'alpha': 0, 'beta': 1, 'rc': 2}


def cache_path(app):
    return os.path.join(app.doctreedir, 'wcs-fields.csv')


def latest_tag(release):
    ''' Returns the newest published tag of the release, such as v5.0.0, or the
        newest alpha, beta or rc tag of it while the release has no final tag yet. '''
    result = subprocess.run(
        ['git', 'ls-remote', '--tags', '--refs', 'https://github.com/%s' % REPO, 'v%s*' % release],
        capture_output=True, text=True, timeout=60, check=True)
    pattern = re.compile(r'refs/tags/(v%s(?:-(alpha|beta|rc)(\d+))?)$' % re.escape(release))
    found = []
    for line in result.stdout.splitlines():
        match = pattern.search(line)
        if match:
            tag, stage, number = match.groups()
            found.append(((1, 0, 0) if stage is None else (0, STAGES[stage], int(number)), tag))
    return max(found)[1] if found else None


def resolve_ref(app):
    ''' The ref the WCS page reads: the wcs_fields_ref setting when set, otherwise
        the newest published tag of the release, otherwise the release branch. '''
    if app.config.wcs_fields_ref:
        return app.config.wcs_fields_ref
    release = app.config.release
    try:
        tag = latest_tag(release)
    except (OSError, subprocess.SubprocessError) as error:
        logger.warning('Could not list the %s tags to find the WCS version (%s); using the %s branch',
                       REPO, error, release)
        return release
    if tag is None:
        logger.info('No %s tag for %s yet; reading the WCS field reference from the %s branch',
                    REPO, release, release)
        return release
    return tag


def download(app):
    ''' Runs once per build. The cached file is rewritten only when its content
        changes, so an incremental build re-reads the page only after a real change. '''
    ref = resolve_ref(app)
    url = 'https://raw.githubusercontent.com/%s/%s%s' % (REPO, ref, FILE)
    app.config.custom_replacements['|WCS_FIELDS_PAGE_URL|'] = 'https://github.com/%s/blob/%s%s' % (REPO, ref, FILE)
    path = cache_path(app)
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
            value = ' '.join(row[name].split())
            if not value:
                content = []
            elif name in CODE_COLUMNS:
                content = [nodes.literal(value, value)]
            else:
                content = [nodes.Text(value)]
            body_row += entry(content)
        body += body_row
    tgroup += body
    return table


class WCSFieldTables(SphinxDirective):
    has_content = False

    def make_section(self, title):
        section = nodes.section()
        section += nodes.title(title, title)
        section['names'].append(nodes.fully_normalize_name(title))
        section['ids'].append(nodes.make_id(title))
        self.state.document.note_implicit_target(section, section)
        return section

    def run(self):
        path = cache_path(self.env.app)
        self.env.note_dependency(path)
        with open(path, newline='', encoding='utf-8') as csv_file:
            rows = list(csv.DictReader(csv_file))
        sets = {}
        for row in rows:
            sets.setdefault(row['Field_Set'], []).append(row)
        result = []
        for name in sorted(sets):
            section = self.make_section(name)
            section += build_table(sets[name])
            result.append(section)
        return result


def setup(app):
    app.add_config_value('wcs_fields_ref', '', 'env')
    app.add_directive('wcs-field-tables', WCSFieldTables)
    app.connect('builder-inited', download)
    return {'parallel_read_safe': True, 'parallel_write_safe': True}
