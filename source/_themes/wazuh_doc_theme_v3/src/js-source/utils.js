/* -----------------------------------------------------------------------------
  Code to be used in any page
----------------------------------------------------------------------------- */

$(document).ready(function() {
  if (!window.matchMedia) {
    return;
  }
  let current = $('head > link[rel="icon"][media]');
  $.each(current, function(i, icon) {
    const match = window.matchMedia(icon.media);
    /**
     * Sets only the favicon that matches the user preference as configured in the browser.
     */
    function swap() {
      if (match.matches) {
        current.remove();
        current = $(icon).appendTo('head');
      }
    }
    match.addListener(swap);
    swap();
  });
});

if ( typeof(versions) === 'undefined' ) {
  const versions = [];
}

/* Menu dropdown hover =========================================================== */
(function($) {
  if(window.matchMedia("(hover: hover)").matches) {
    $('.navbar-nav .dropdown-toggle').on('mouseenter', function(e) {
      if (!$(this).closest('.dropdown').hasClass('show')) {
        e.stopPropagation();
        $(this).trigger('click');
      }
    });
    $('.navbar-nav .dropdown-toggle').on('mouseleave', function(e) {
      let toElement = e.toElement || e.relatedTarget;
      if ($(this).closest('.dropdown').hasClass('show')
        && toElement !== $(this).siblings()[0]) {
        e.stopPropagation();
        $(this).trigger('click');
      }
    });
    $('.navbar-nav .dropdown-menu').on('mouseleave', function(e) {
      let toElement = e.toElement || e.relatedTarget;
      if ($(this).closest('.dropdown').hasClass('show')
        && toElement !== $(this).siblings()[0]) {
        $(this).siblings().trigger('click');
      }
    });
  }
})(jQuery);


/* Using ReDoc ============================================================== */
const minVersionRedoc = '4.0';
const useApiRedoc = (compareVersion(DOCUMENTATION_OPTIONS.VERSION, minVersionRedoc) >= 0);
/* List of nodes in the toctree and the content that should be open in a new tab */
const newTabNodes = [
  'user-manual/api/reference',
  'cloud-service/apis/reference',
];

/* Open external links in a new tab ========================================= */

let oursHost = ['documentation.wazuh.com'];

$('a.reference.external').each(function() {
  let link = new URL(this.href);
  if ( !oursHost.includes(link.host) ) {
    $(this).attr('target', '_blank').attr('rel', 'noreferrer noopener');
  }
});

/* Helpful functions ======================================================== */

/**
 * Compare the numbers of 2 release versions
 * @param {string} version1 First version to compare
 * @param {string} version2 Second version to compare
 * @return {int} Resulting value:
 *  * 1 if version1 > version2
 *  * 0 if version1 = version2
 *  * -1 if version1 < version2
 *  * false if the comparation could not be done
 */
function compareVersion(version1, version2) {
  let result = false;
  if ( typeof(version1) == 'string' && typeof(version2) == 'string') {
    let v1 = version1.split('.');
    let v2 = version2.split('.');
    if ( v1.length >= 2 && v2.length >= 2 ) {
      v1 = v1.map((x) =>parseInt(x));
      v2 = v2.map((x) =>parseInt(x));
      if ( v1[0] > v2[0] ) {
        result = 1;
      } else if ( v1[0] < v2[0] ) {
        result = -1;
      } else {
        if ( v1[1] > v2[1] ) {
          result = 1;
        } else if ( v1[1] < v2[1] ) {
          result = -1;
        } else {
          result = 0;
        }
      }
    }
  }
  return result;
}

/**
  * Marks with a give class all nodes in a list.
  * Function mainly used to mark the empty nodes (documents that contain only a toctree, without real content).
  * Note: this might be improved in the future using a new builder or extension.
  * @param {array} nodeList List of nodes that needs to be marked with the class.
  * @param {string} className Class to be applied to the nodes.
  * @param {string} fromNodeSelector Selector of the element from which the marking must be done.
  *                                  Empty string to mark all matching nodes in the whole DOM.
  */
function markTocNodesWithClass(nodeList, className, fromNodeSelector) {
  nodeList.forEach(function(tocNode) {
    markedNode = '.+\/' + tocNode + '.html';
    const regex = new RegExp(markedNode, 'g');
    $(fromNodeSelector+' a').each(function() {
      const href = $(this).prop('href').split('#')[0];
      if (regex.test(href)) {
        $(this).addClass(className);
      }
    });
  });
}
