import csv
import os
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


def cache_path(app):
    return os.path.join(app.doctreedir, 'wcs-fields.csv')


def download(app):
    ''' Runs once per build. The cached file is rewritten only when its content
        changes, so an incremental build re-reads the page only after a real change. '''
    url = app.config.wcs_fields_url
    path = cache_path(app)
    # A separate stamp file tracks when the download last ran: touching the CSV
    # itself would make Sphinx read the page again even though nothing changed.
    stamp = path + '.stamp'
    try:
        if time.time() - os.path.getmtime(stamp) < MAX_AGE and os.path.exists(path):
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
        stamp_file.write(str(time.time()))


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
        source = self.make_section('Source file')
        paragraph = nodes.paragraph()
        paragraph += nodes.Text('The tables on this page come from the ')
        paragraph += nodes.reference(
            'fields.csv', '', nodes.literal('fields.csv', 'fields.csv'),
            refuri=self.env.config.wcs_fields_page_url)
        paragraph += nodes.Text(' file in the wazuh-indexer-plugins repository.')
        source += paragraph
        result.append(source)
        return result


def setup(app):
    app.add_config_value('wcs_fields_url', '', 'env')
    app.add_config_value('wcs_fields_page_url', '', 'env')
    app.add_directive('wcs-field-tables', WCSFieldTables)
    app.connect('builder-inited', download)
    return {'parallel_read_safe': True, 'parallel_write_safe': True}
