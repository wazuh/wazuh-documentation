from docutils import nodes
from sphinx.util.docutils import SphinxDirective

# Reference pages made of several headings that each hold one long table. The
# collapsible-tables directive makes every section that holds a table start
# collapsed under its heading (theme accordions) and adds a search box above the
# sections that filters the rows of all the tables (source/_static/js/collapsible-tables.js).
# The text and tables of the page stay as they are in the source.
#
#    .. collapsible-tables:: settings
#
# The argument is the plural noun the search box uses for the rows, for example
# "settings" or "helper functions".


class CollapsibleTables(SphinxDirective):
    required_arguments = 1
    final_argument_whitespace = True
    has_content = False

    def run(self):
        # Read by wrap_sections() once the page is parsed
        self.state.document['collapsible-tables'] = self.arguments[0].strip()
        return []


def wrap_sections(app, doctree):
    ''' Moves the content of each section that has a table into an accordion container.
        The theme's accordions.js expects it right after the heading. The page's own
        top-level section is left as it is. '''
    noun = doctree.get('collapsible-tables')
    if not noun:
        return
    for section in list(doctree.findall(nodes.section)):
        if isinstance(section.parent, nodes.document):
            continue
        tables = [child for child in section.children if isinstance(child, nodes.table)]
        if not tables:
            continue
        for table in tables:
            table['classes'].append('collapsible-table')
        # Subsections stay outside the container, after it
        body = [child for child in section.children[1:] if not isinstance(child, nodes.section)]
        container = nodes.container(classes=['accordion-section'])
        container['collapsible-noun'] = noun
        for child in body:
            section.remove(child)
            container += child
        section.insert(1, container)


def add_search_script(app, pagename, templatename, context, doctree):
    ''' Adds the search box script only to the pages that use the directive. '''
    if doctree and doctree.get('collapsible-tables'):
        app.add_js_file('js/collapsible-tables.js')
        context['metatags'] = context.get('metatags', '') + (
            '<meta name="collapsible-tables-noun" content="%s">' % doctree['collapsible-tables'].replace('"', ''))


def setup(app):
    app.add_directive('collapsible-tables', CollapsibleTables)
    app.connect('doctree-read', wrap_sections)
    app.connect('html-page-context', add_search_script)
    return {'parallel_read_safe': True, 'parallel_write_safe': True}
