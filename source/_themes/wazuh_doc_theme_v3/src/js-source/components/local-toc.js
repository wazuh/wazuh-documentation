/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): local-toc.js
 * --------------------------------------------------------------------------
 */

/* Fix for the first item when using the Bootstrap scrollspy in our documentation */
$(document).ready(function() {
  if ($('#local-toc').length > 0) {
     /* Fix the href of the first item */
    const firstLocalTocItem = $('#local-toc > .navbar-nav > .nav-item:first-of-type > .nav-link');
    let firstSection = $('main:first-of-type > .section:first-of-type');

    /* Fix for docutils>=0.17 */ 
    if (firstSection.length === 0) {
      firstSection = $('main:first-of-type > section:first-of-type');
    }

    // Check if the firstSection has a valid id before updating the href
    const firstSectionId = firstSection.attr('id');
    if (firstSectionId) {
      firstLocalTocItem.attr('href', firstLocalTocItem.attr('href') + firstSectionId);
    }
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#local-toc',
      offset: 200
    });
  }
});

/* Expand accordion functionality for the local-toc */
$('#local-toc .nav-link').on('click', function(e) {
  const anchor = $(e.target).attr('href');
  let accordions = $('[href="'+anchor+'"].headerlink').parent();
  if ( accordions.hasClass('accordion-title') ) {
    if ( accordions.hasClass('collapsed') ) {
      accordions.trigger('click');
    }
  } else {
    accordions = $('[href="'+anchor+'"].headerlink').parents('.accordion-section');
    accordions.each(function(){
      if (!$(this).hasClass('show')) {
        $(this).siblings('.accordion-title').trigger('click');
        $('html,body').animate({scrollTop:$('[href="'+anchor+'"].headerlink').offset().top - 180}, 'smooth');
      }
    });
  }
});
