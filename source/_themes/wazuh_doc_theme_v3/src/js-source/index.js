/* -----------------------------------------------------------------------------
  Index page
----------------------------------------------------------------------------- */

const maxShowItems = 3;

if ( $('.index') ) {
  $('.loading').removeClass('loading');

  /* Changes in release notes */
  const arrowMore = document.createElement('span');
  const useElement = document.createElement('use');
  arrowMore.setAttribute('class', 'ico-long-arrow-right');
  $('.toctree-wrapper:last-of-type .toctree-l1:last-of-type .toctree-l2:first-of-type > a').text('More').append(arrowMore);

  /* Set .release-notes-card */
  $('.index [href*="release-notes/index.html"]').closest('.toctree-l1').addClass('release-notes-card');


  /* Move Quickstart */
  const quickstart = $('[href="quickstart.html"]').parent();
  quickstart.attr('id', 'quickstart');
  quickstart.parent().prepend(quickstart);

  /* Move #get-wazuh-card */
  $("#get-wazuh-card").detach().appendTo('#index .toctree-wrapper:last-of-type > ul');
  $('#index aside').remove();

  /* Hide specific subtrees from the index */
  const nodesToHide = [];
  
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
  /* Disable empty TOC nodes links */
  if ( emptyTocNodes ) {
    for (let i = 0; i < emptyTocNodes.length; i++) {
      const foundNodes = $('a[href="' + emptyTocNodes[i] + '.html"]');
      if ( foundNodes.length > 0) {
        const linkText = foundNodes.text();
        const parent = foundNodes.parent();
        if ( parent.hasClass('toctree-l1') ) {
          let spanTitle = document.createElement('span');
          spanTitle.className = 'section-title';
          $(spanTitle).text(linkText).attr('data-href', emptyTocNodes[i] + '.html');
          foundNodes.remove();
          parent.prepend(spanTitle);
        }
      }
    }
  }

  /* Add click event functionality for dropdown toggle button to uncollapse the index blocks */
  $(document).delegate('.toctree-l1 .toggle', 'click', function(e) {
    e.preventDefault();
    const indexBlock = $(e.target).closest('.collapsible');
    const isCollapsed = indexBlock.hasClass('collapsed');
    $('.collapsible').addClass('collapsed');
    $('.collapsed .toggle').attr('aria-label', `Expand section`);

    /* Toggle uncollapse */
    if ( isCollapsed ) {
      indexBlock.removeClass('collapsed');
      indexBlock.find('.toggle').attr('aria-label', `Collapse section`);
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
    a.setAttribute('aria-label', 'Expand section');
    a.innerHTML = '';

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
