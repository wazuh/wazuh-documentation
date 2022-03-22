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
      $(this).append($('<button class="toc-toggle-btn"><span class="sr-only">Expand submenu</span></button>'));
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

    $('#global-toc a .toc-toggle-btn .sr-only').text('Expand submenu');
    $(this).find('.sr-only').text('Close submenu');
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
  /* List of empty nodes, containing only a toctree */
  const emptyTocNodes = [
    'amazon/configuration/index',
    'compliance',
    'containers',
    'deployment',
    'development/index',
    'docker-monitor/index',
    'installation-guide/elasticsearch-cluster/index',
    'installation-guide/wazuh-cluster/index',
    'installation-guide/upgrading/legacy/index',
    'installation-guide/packages-list/linux/linux-index',
    'installation-guide/packages-list/solaris/solaris-index',
    'monitoring',
    'user-manual/index',
    'user-manual/agents/index',
    'user-manual/agents/remove-agents/index',
    'user-manual/agents/listing/index',
    'user-manual/kibana-app/reference/index',
    'user-manual/ruleset/ruleset-xml-syntax/index',
    'installation-guide/distributed-deployment/step-by-step-installation/elasticsearch-cluster/index',
    'installation-guide/distributed-deployment/step-by-step-installation/wazuh-cluster/index',
    'user-manual/capabilities/active-response/ar-use-cases/index',
  ];

  markTocNodesWithClass(emptyTocNodes, 'empty-toc-node');

  /* Behavior of the empty nodes: toggle */
  $('#global-toc .empty-toc-node').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();
      $(this).find('.toc-toggle-btn').click();
    });
  });

  /* Nodes to open in a new tab --------------------------------------------- */
  if ( useApiRedoc ) {
    markTocNodesWithClass(newTabNodes, 'js-new-tab');
    $('.js-new-tab').attr('target', '_blank');
  }

  /* Nodes with hidden subtrees --------------------------------------------- */
  /* list of nodes (by title) which will not show their subtree */
  // const hideSubtreeNodes = [
  //   'Install Wazuh manager on Linux',
  //   'Install Wazuh agent on Linux',
  // ].map(function(item) {
  //   return item.toLowerCase();
  // });

  // hideSubtree(hideSubtreeNodes);

  /**
  * Hides from the global toctree the subtree of particular nodes specified in a list.
  * @param {array} nodeList List of nodes whose subtree should not be shown in the global toctree.
  */
  // function hideSubtree(nodeList) {
  //   $('#global-toc a').each(function() {
  //     if (jQuery.inArray($(this).text().toLowerCase(), nodeList) !== -1) {
  //       $(this).siblings().hide();
  //       $(this).children('button').hide();
  //     }
  //   });
  // }

  /* Globa TOC utility functions -------------------------------------------- */
  /**
   * Gives the class stored in className to all nodes from nodeList that are present in the toctree.
   * Function mainly used to mark the empty nodes (documents that contain only a toctree, without real content).
   * Note: this might be improved in the future using a new builder or extension.
   * @param {array} nodeList List of nodes in the toctree that needs to be marked with the class.
   * @param {string} className Class to be applied to the nodes.
   */
  function markTocNodesWithClass(nodeList, className) {
    let regex;
    // const curLocation = location.href.split('#')[0];
    nodeList.forEach(function(tocNode) {
      markedNode = '.+\/' + tocNode + '.html';
      regex = new RegExp(markedNode, 'g');
      $('#global-toc a').each(function() {
        const href = $(this).prop('href').split('#')[0];
        // const isCurrent = (href === curLocation);
        /* The selected menu link in the globaltoc acts as the toggle button, showing on and off its subtree */
        if (regex.test(href)) {
          $(this).addClass(className);
        }
      });
    });
  }
}
