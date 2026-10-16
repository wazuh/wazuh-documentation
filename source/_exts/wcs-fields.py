import csv
import io
import os
import re
import time
from urllib.request import urlopen

from sphinx.util import logging

logger = logging.getLogger(__name__)

# Replaced, in the page that holds it, by one section per field set, each with
# a table of that field set's fields read from the WCS fields.csv file.
MARKER = '.. wcs-field-tables::'
MAX_AGE = 60 * 15  # 15 minutes, same as the manager API spec download
COLUMNS = ['Field', 'Type', 'Level', 'Normalization', 'Indexed', 'Example', 'Description']
WIDTHS = '25 9 9 9 8 15 25'
SPECIAL = re.compile(r'([\\*`|<>])')


def escape(text):
    ''' Escapes the characters reStructuredText would read as markup. '''
    text = SPECIAL.sub(r'\\\1', text.strip())
    text = re.sub(r'_(?=\s|$|[.,;:!?)\]])', r'\\_', text)
    return re.sub(r'(?<=\s)_|^_', r'\\_', text)


def literal(text):
    ''' Renders a value in code font when it can be, escaped plain text otherwise. '''
    text = text.strip()
    if not text:
        return ''
    if '`' in text or '\n' in text:
        return escape(text).replace('\n', ' ')
    return '``%s``' % text


def cell(text):
    return text.replace('"', '""')


def download(app):
    url = app.config.wcs_fields_url
    path = os.path.join(app.doctreedir, 'wcs-fields.csv')
    try:
        if time.time() - os.path.getmtime(path) < MAX_AGE:
            return path
    except OSError:
        pass
    try:
        with urlopen(url, timeout=60) as response:
            data = response.read()
    except OSError as error:
        if os.path.exists(path):
            logger.warning('Could not refresh %s (%s); using the cached copy', url, error)
            return path
        logger.warning('Could not download the WCS field reference from %s: %s', url, error)
        return None
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as csv_file:
        csv_file.write(data)
    return path


def build(path):
    with open(path, newline='', encoding='utf-8') as csv_file:
        rows = list(csv.DictReader(csv_file))
    sets = {}
    for row in rows:
        sets.setdefault(row['Field_Set'], []).append(row)
    lines = []
    for name in sorted(sets):
        title = '``%s``' % name
        lines += [title, '-' * len(title), '']
        lines += ['.. csv-table::', '   :header-rows: 1', '   :widths: %s' % WIDTHS, '']
        lines.append('   ' + ','.join('"%s"' % c for c in COLUMNS))
        for row in sets[name]:
            values = [
                literal(row['Field']),
                literal(row['Type']),
                literal(row['Level']),
                literal(row['Normalization']),
                literal(row['Indexed']),
                literal(row['Example']),
                escape(row['Description']),
            ]
            lines.append('   ' + ','.join('"%s"' % cell(v) for v in values))
        lines.append('')
    return '\n'.join(lines)


def read_source(app, docname, source):
    if MARKER not in source[0]:
        return
    path = download(app)
    if path is None:
        source[0] = source[0].replace(MARKER, '')
        return
    source[0] = source[0].replace(MARKER, build(path))


def setup(app):
    app.add_config_value(
        'wcs_fields_url',
        'https://raw.githubusercontent.com/wazuh/wazuh-indexer-plugins/main/wcs/stateless/events/main/docs/fields.csv',
        'env')
    app.connect('source-read', read_source)
    return {'parallel_read_safe': True, 'parallel_write_safe': True}
