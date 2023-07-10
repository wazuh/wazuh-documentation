import os
import sys
from docutils import nodes
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives, states
from docutils.parsers.rst.roles import set_classes
from sphinx.util.console import brown
from sphinx.util.osutil import ensuredir
from sphinx.util.osutil import copyfile

from sphinx.util.docutils import SphinxDirective

try:
    from sphinx.util import status_iterator
except ImportError:
    pass

STATICS_DIR_NAME = '_static'

DEFAULT_CONFIG = dict(
    default_image_width='auto',
    default_image_height='auto',
    default_show_title=False,
    requests_kwargs={},
    override_image_directive=False,
    show_caption=False,
    default_class='wazuh-image',
    wrap_image=True
)

class WazuhImages(nodes.image, nodes.General, nodes.Element):
    
    def asdom(image_node):
        src = image_node['uri']
        alt = image_node['alt']
        img_element_str = '<img class="wlb-image" src="%s" alt="%s">' % (src, alt)
        return img_element_str

def directive_boolean(value):
    if not value.strip():
        raise ValueError("No argument provided but required")
    if value.lower().strip() in ["yes", "1", 1, "true", "ok"]:
        return True
    elif value.lower().strip() in ['no', '0', 0, 'false', 'none']:
        return False
    else:
        raise ValueError(u"Please use on of: yes, true, no, false. "
                         u"Do not use `{}` as boolean.".format(value))

class WazuhImagesDirective(SphinxDirective):

    align_h_values = ('left', 'center', 'right')
    align_v_values = ('top', 'middle', 'bottom')
    align_values = align_v_values + align_h_values

    def align(argument):
        # This is not callable as self.align.  We cannot make it a
        # staticmethod because we're saving an unbound method in
        # option_spec below.
        return directives.choice(argument, WazuhImagesDirective.align_values)
    
    has_content = True
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    
    option_spec = {
        'alt': directives.unchanged,
        'title': directives.unchanged,
        'height': directives.length_or_unitless,
        'width': directives.length_or_percentage_or_unitless,
        'scale': directives.percentage,
        'align': align,
        'target': directives.unchanged_required,
        'class': directives.class_option,
        'show_caption': directive_boolean,
        'wrap_image': directive_boolean
    }

    def run(self):
        env = self.state.document.settings.env # sphinx.environment.BuildEnvironment 
        conf = env.app.config.wazuh_images_config
        
        targetid = 'wazuh_image-%d' % self.env.new_serialno('wazuh_image')
        targetnode = nodes.target('', '', ids=[targetid])
        
        set_classes(self.options)
        if 'classes' in self.options:
            self.options['classes'].insert(0, conf['default_class'])
        else:
            self.options['classes'] = [conf['default_class']]
        
        classes = self.options.get('classes', '')
        width = self.options.get('width', conf['default_image_width'])
        height = self.options.get('height', conf['default_image_height'])
        alt = self.options.get('alt', '')
        title = self.options.get('title', '' if conf['default_show_title'] else None)
        align = self.options.get('align', '')
        show_caption = self.options.get('show_caption', conf['show_caption'])
        wrap_image = self.options.get('wrap_image', conf['wrap_image'])
        
        wazuh_image_node = WazuhImages()
        
        wazuh_image_node['uri'] = self.arguments[0]
        env.images.add_file('', wazuh_image_node['uri'])
        
        if title is None:
            wazuh_image_node['title'] = ''
        elif title:
            wazuh_image_node['title'] = title
        else:
            wazuh_image_node['title'] = ''
        
        wazuh_image_node['show_caption'] = show_caption
        wazuh_image_node['width'] = width
        wazuh_image_node['height'] = height
        wazuh_image_node['classes'] += classes
        wazuh_image_node['alt'] = alt
        wazuh_image_node['tabindex'] = 0
        wazuh_image_node['wrap_image'] = wrap_image
        if len(align) > 0:
            wazuh_image_node['align'] = align
        
        if not hasattr(self.env, 'wazuh_images_all_images'):
            self.env.wazuh_images_all_images = []

        self.env.wazuh_images_all_images.append({
            'docname': self.env.docname,
            'lineno': self.lineno,
            'wazuh_image': wazuh_image_node.deepcopy(),
            'target': targetnode,
        })
        
        return [targetnode, wazuh_image_node]

def purge_wazuh_images(app, env, docname):
    if not hasattr(env, 'wazuh_images_all_images'):
        return

    env.wazuh_images_all_images = [wazuh_image for wazuh_image in env.wazuh_images_all_images
                                    if wazuh_image['docname'] != docname]

def visit_wazuh_image_node_html(self, node):
    container_align = ''
    if 'align' in node:
        container_align = ' align-'+node['align']
    if node['wrap_image']:
        self.body.append('<div class="%s-wrapper%s">' % (node['classes'][0], container_align))
        self.visit_image(node)
        self.body.append('</div>')
    else:
        self.visit_image(node)

def depart_wazuh_image_node_html(self, node):
    pass

class WazuhLightBox(nodes.General, nodes.Element):
    
    STATIC_FILES = (
        'min/wazuh-light-box.min.css',
        'min/wazuh-light-box.min.js',
        'img/close.png',
        'img/next.png',
        'img/prev.png',
        'img/loading.gif',
    )
    
    image_list = []

def manage_static_files(app, env):
    EXT_ASSETS_FOLDER = 'wazuh-doc-images'
    STATICS_DIR_PATH = os.path.join(app.builder.outdir, STATICS_DIR_NAME)
    dest_path = os.path.join(STATICS_DIR_PATH, EXT_ASSETS_FOLDER)
    files_to_copy = WazuhLightBox.STATIC_FILES

    for source_file_path in (app.builder.status_iterator
        if hasattr(app.builder, 'status_iterator') else status_iterator)(
            files_to_copy,
            'Copying static files for wazuh-doc-images...',
            brown, len(files_to_copy)):
        dest_file_path = os.path.join(dest_path, source_file_path)
    
        if not os.path.exists(os.path.dirname(dest_file_path)):
            ensuredir(os.path.dirname(dest_file_path))
        source_file_path = os.path.join(os.path.dirname(__file__), EXT_ASSETS_FOLDER, source_file_path)
    
        copyfile(source_file_path, dest_file_path)
    
        if dest_file_path.endswith('.js'):
            app.add_js_file(os.path.relpath(dest_file_path, STATICS_DIR_PATH))
        elif dest_file_path.endswith('.css'):
            app.add_css_file(os.path.relpath(dest_file_path, STATICS_DIR_PATH))


# The registration function
def setup_add_wazuh_light_box(app, pagename, templatename, context, doctree):
    wazuh_images_doc_images = []
    if doctree:
        for node_image in doctree.traverse(WazuhImages):
            wazuh_images_doc_images.append(node_image)

    # The template function
    def add_wazuh_light_box():
        class_prefix = "wazuh-light-box"
        class_short_prefix = "wlb"
        # Overlay screen
        light_box_str = '<div id="%s-overlay" class="%s-overlay"></div>' % (class_prefix, class_prefix)
        # Light box (opening)
        light_box_str += '<div id="%s" class="%s">' % (class_prefix, class_prefix)
        light_box_str += '<div class="%s-slides-container">' % class_prefix 
        # Loading spinner
        light_box_str += '<div class="%s-loading"></div>' % class_short_prefix 
        # Set of slides
        for gallery_index, image in enumerate(wazuh_images_doc_images):    
            target_id = image['ids'][0]
            light_box_str += '<div class="%s-slide" data-image-id="%s">' % (class_prefix, target_id) 
            light_box_str += '<div class="%s-image-wrapper">' % (class_short_prefix) 
            light_box_str += image.asdom()
            # Buttons: prev button
            if gallery_index != 0:
                light_box_str += '<div tabindex="0" class="%s-prev-button">' % class_short_prefix
                light_box_str += '<span class="%s-prev-button-content read-only">Previous image</span>' % class_short_prefix
                light_box_str += '</div>'
            # Buttons: next button
            if gallery_index != len(wazuh_images_doc_images)-1:
                light_box_str += '<div tabindex="0" class="%s-next-button">' % class_short_prefix
                light_box_str += '<span class="%s-next-button-content read-only">Next image</span>' % class_short_prefix
                light_box_str += '</div>'
            
            light_box_str += '</div>' # Closes the image wrapper
            light_box_str += '<div class="%s-data-container">' % class_short_prefix
            if image['show_caption']:
                light_box_str += '<div class="%s-title-container">' % class_short_prefix
                if image['title'] != "":
                    light_box_str += '%s' % image['title']
                else:
                    light_box_str += '%s' % image['alt']
                light_box_str += '</div>'
            light_box_str += '<div class="%s-number-container">Image %d of %d</div>' % (class_short_prefix, gallery_index + 1, len(wazuh_images_doc_images))
            light_box_str += '</div>' # Closes the data-container
            light_box_str += '</div>' # Closes the slide wrapper
        light_box_str += '</div>' # Closes the slides container
        # Buttons: close button
        light_box_str += '<button tabindex="0" class="%s-close-button">' % class_short_prefix
        light_box_str += '<span class="%s-close-button-content read-only">Close</span>' % class_short_prefix
        light_box_str += '</button>'
        
        light_box_str += '</div>' # Closes the outer container of the light box (no overlay)
        return light_box_str
        
    # Add it to the page's context
    context['add_wazuh_light_box'] = add_wazuh_light_box

def load_config(app, config):
    final_config = DEFAULT_CONFIG
    final_config.update(config['wazuh_images_config'])
    app.config.wazuh_images_config = final_config
    if app.config.wazuh_images_config['override_image_directive'] != False:
        image_directive_string = app.config.wazuh_images_config['override_image_directive']
    else: 
        image_directive_string = 'wazuh_image'
    app.add_directive(image_directive_string, WazuhImagesDirective)

def setup(app):
    app.connect("config-inited", load_config)
    app.add_config_value('wazuh_images_config', DEFAULT_CONFIG, 'env')
    app.add_node(WazuhImages, html=(visit_wazuh_image_node_html, depart_wazuh_image_node_html))
    app.add_node(WazuhLightBox)
    app.add_directive('wazuh_image', WazuhImagesDirective)
    app.connect("html-page-context", setup_add_wazuh_light_box)
    app.connect('env-purge-doc', purge_wazuh_images)
    app.connect('env-updated', manage_static_files)

    return {
        'version': '0.3',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
