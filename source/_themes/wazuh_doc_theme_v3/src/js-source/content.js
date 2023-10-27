/* -----------------------------------------------------------------------------
  Regular documentation content page
----------------------------------------------------------------------------- */

if ( $('.document') ) {
  /* Code related to the pages based on ReDoc ------------------------------- */
  const domainReplacePattern = 'https://DOMAIN';
  /* Change DOMAIN in href */
  $('[href^="'+domainReplacePattern+'/"]').each(function() {
    const oldHref = $(this).attr('href');
    $(this).attr('href', oldHref.replace(domainReplacePattern+'/', DOCUMENTATION_OPTIONS.URL_ROOT));
    $(this).attr('target', '_blank');
  });

  /* Links to new tab found within the main content */
  $('main .reference.internal').each(function() {
    const linkRef = this;
    newTabNodes.forEach(function(item) {
      if (linkRef.href.indexOf(item) !== -1) {
        $(linkRef).attr('target', '_blank');
        return;
      }
    });
  });

  /* Headerlink text -------------------------------------------------------- */
  $('.headerlink').text('Permalink to this headline');
  $('.headerlink').attr('title', 'Permalink to this headline');

  /* Table adjustments ------------------------------------------------------ */
  /* Turn tables into responsive table */
  reponsiveTables();

  /**
   * Adds the class table-responsive to tables in #main-content wider than their container.
   */
  function reponsiveTables() {
    $('table.docutils:not(.list-rows)').removeClass('table-responsive');
    $('table.docutils:not(.list-rows)').each(function() {
      if ($(this).width() > $('main > div:first-of-type').width()) {
        $(this).addClass('table-responsive');
      }
    });
  }

  /* Avoid table as layout (accessibility issue) */
  $('table.docutils.list-rows').each(function() {
    $(this).attr('role', 'presentation');
  });

  $(window).on('resize', reponsiveTables);
}
