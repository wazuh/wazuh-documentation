/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): global-toc.js
 * --------------------------------------------------------------------------
 */

if ( $('#global-toc').length > 0 ) {
  /* Add subtree toggle buttons and its functionality ----------------------- */
  /* Finds all nodes that contains subtrees within the globaltoc and appends a toggle button to them */
  $('#global-toc .toctree-l1 a').each(function(e) {
    if ($(this).siblings('ul').length) {
      $(this).closest('li').addClass('toc-toggle');
      $(this).append($('<button class="toc-toggle-btn"><span class="visually-hidden">Expand submenu</span></button>'));
    }
  });

  /* Behavior when clicking current toctree node: scroll up  */
  $('#global-toc .current-toc-node').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, '500');
    });
  });

  /* Toggle collapse */
  $('#global-toc a .toc-toggle-btn').on('click', function(e) {
    /* Normal link: avoid toggle if current menu item doesn't have submenu */

    $('#global-toc a .toc-toggle-btn .visually-hidden').text('Expand submenu');
    $(this).find('.visually-hidden').text('Close submenu');
    li = $(e.target).closest('li');
    if (!li || li.children('ul').length == 0) {
      return true;
    }

    e.stopPropagation();
    e.preventDefault();

    if (li.hasClass('show')) {
      li.removeClass('show');
    } else {
      li.siblings('li').removeClass('show');
      li.addClass('show');
    }

    if (!li.parents().hasClass('show')) {
      $('.globaltoc li.show').addClass('show');
    }

    $('.globaltoc li.initial').removeClass('initial');
    completelyHideMenuItems();
    return false;
  });

  /**
   * Completely hides the visually hidden elements
   */
  function completelyHideMenuItems() {
    $('#global-toc li ul').each(function() {
      if ($(this).closest('li').hasClass('show')) {
        this.hidden = false;
        $(this).slideDown(300);
      } else {
        $(this).slideUp(300, function() {
          this.hidden = true;
        });
      }
    });
  }

  /* Empty Nodes ------------------------------------------------------------ */

  if ( emptyTocNodes ) {
    markTocNodesWithClass(emptyTocNodes, 'empty-toc-node', '#global-toc');
    $('#global-toc .current-toc-node').addClass('empty-toc-node');
  }

  /* Behavior of the empty nodes: toggle */
  $('#global-toc .empty-toc-node').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();
      $(this).find('.toc-toggle-btn').click();
    });
  });

  /* Nodes to open in a new tab --------------------------------------------- */
  if ( useApiRedoc ) {
    markTocNodesWithClass(newTabNodes, 'js-new-tab', '');
    $('.js-new-tab').attr('target', '_blank');
  }

  /* Nodes with hidden subtrees (pre 4.3) ----------------------------------- */
  /* list of nodes (by title) which will not show their subtree */
  const hideSubtreeNodes = [
    'Install Wazuh manager on Linux',
    'Install Wazuh agent on Linux',
  ].map(function(item) {
    return item.toLowerCase();
  });

  hideSubtree(hideSubtreeNodes);

  /**
  * Hides from the global toctree the subtree of particular nodes specified in a list.
  * @param {array} nodeList List of nodes whose subtree should not be shown in the global toctree.
  */
  function hideSubtree(nodeList) {
    $('#global-toc a').each(function() {
      if (jQuery.inArray($(this).text().toLowerCase(), nodeList) !== -1) {
        $(this).siblings().hide();
        $(this).children('button').hide();
      }
    });
  }
}
