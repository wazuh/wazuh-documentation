/* -----------------------------------------------------------------------------
  Index page
----------------------------------------------------------------------------- */

if ( $('.index') ) {
  const maxShowItems = 3;

  $('.loading').removeClass('loading');

  /* Move Quickstart */
  $('[href="quickstart.html"]').first().unwrap().wrap('<div id="quickstart"></div>');
  if ( $('#quickstart').length ) {
    $('.inner-body').prepend($('#quickstart'));
  }

  /* Hide specific subtrees from the index */
  const nodesToHide = [
    'style-guide/index.html',
    'learning-wazuh/index.html',
    'development/index.html',
    'migrating-from-ossec/index.html',
  ];
  hideSectionsFromIndex(nodesToHide);
  /**
   * Hides particular nodes and their subrees from the index page only
   * @param  {Array} nodesToHide               List of nondes that must be hidden.
   */
  function hideSectionsFromIndex(nodesToHide) {
    for ( let i = 0; i < nodesToHide.length; i++ ) {
      $('.index [href="' + nodesToHide[i] + '"]').parent().remove();
    }
  }

  /* Add click event functionality for dropdown toggle button to uncollapse the index blocks */
  $(document).delegate('.toctree-l1 .toggle', 'click', function(e) {
    e.preventDefault();
    const indexBlock = $(e.target).closest('.collapsible');
    if ( indexBlock.hasClass('collapsed') ) {
      /* Toggle uncollapse */
      indexBlock.removeClass('collapsed');
    } else {
      /* Toggle collapse */
      indexBlock.addClass('collapsed');
    }
  });

  /* Set collapsible index blocks */
  setCollapsibleIndexBlocks();

  /**
  * Checks the index blocks and marks the ones with exceeding number of items.
  */
  function setCollapsibleIndexBlocks() {
    const indexBlocks = $('.toctree-l1');
    const a = document.createElement('a');

    // Create dropdown toggle button
    a.setAttribute('href', '#');
    a.setAttribute('class', 'toggle');
    a.innerHTML = 'More';

    // Mark collapsible blocks and add the button
    indexBlocks.each( function() {
      const singleIndexBlock = $(this);
      const childList = singleIndexBlock.find('ul');
      if ( childList.length > 0 ) {
        if ( singleIndexBlock.find('ul .toctree-l2').length > maxShowItems ) {
          singleIndexBlock.addClass('collapsible').addClass('collapsed');
          singleIndexBlock.append(a.cloneNode(true));
        }
      }
    });
  }
}
