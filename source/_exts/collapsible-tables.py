from docutils import nodes
from docutils.parsers.rst import directives
from sphinx.util.docutils import SphinxDirective

# Reference pages made of several headings that each hold one long table. The
# collapsible-tables directive makes every section that holds a table start
# collapsed under its heading (theme accordions) and adds a search box above the
# sections that filters the rows of all the tables (source/_static/js/collapsible-tables.js).
# The text and tables of the page stay as they are in the source.
#
#    .. collapsible-tables:: settings
#
# With the sections option there are no tables to search: every section that has no
# subsections collapses, and the search box matches the text of each one.
#
#    .. collapsible-tables:: helper functions
#       :sections:
#
# The argument is the plural noun the search box uses for the rows, for example
# "settings" or "helper functions".


class CollapsibleTables(SphinxDirective):
    required_arguments = 1
    option_spec = {'sections': directives.flag}
    final_argument_whitespace = True
    has_content = False

    def run(self):
        # Read by wrap_sections() once the page is parsed
        self.state.document['collapsible-tables'] = self.arguments[0].strip()
        self.state.document['collapsible-sections'] = 'sections' in self.options
        return []


def wrap_sections(app, doctree):
    ''' Moves the content of each section that has a table into an accordion container.
        The theme's accordions.js expects it right after the heading. The page's own
        top-level section is left as it is. '''
    noun = doctree.get('collapsible-tables')
    if not noun:
        return
    def collapse(section):
        # Subsections, such as the example that follows a table, go inside too
        body = list(section.children[1:])
        container = nodes.container(classes=['accordion-section'])
        for child in body:
            section.remove(child)
            container += child
        section.insert(1, container)

    sections = [s for s in doctree.findall(nodes.section) if not isinstance(s.parent, nodes.document)]
    if doctree.get('collapsible-sections'):
        leaves = [s for s in sections if not any(isinstance(c, nodes.section) for c in s.children)]
        for section in leaves:
            section['classes'].append('collapsible-text')
            collapse(section)
        return
    with_tables = [s for s in sections if any(isinstance(c, nodes.table) for c in s.children)]
    for section in with_tables:
        for table in [c for c in section.children if isinstance(c, nodes.table)]:
            table['classes'].append('collapsible-table')
    # A section without a table next to sections with one collapses too, so the
    # headings look alike. The search box matches its text.
    parents = [t.parent for t in with_tables]
    siblings = [s for s in sections if s not in with_tables and s.parent in parents
                and not any(isinstance(c, nodes.section) for c in s.children)]
    for section in siblings:
        section['classes'].append('collapsible-text')
    for section in with_tables + siblings:
        collapse(section)


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
