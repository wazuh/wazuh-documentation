$(function() {
  /* -- Menu scroll -------------------------------------------------------------------------------*/

  if ($('#page').hasClass('no-latest-docs')) {
    noticeHeight = parseInt($('.no-latest-notice').outerHeight());
  }
  setTimeout(function() {
    if ($('#page').hasClass('no-latest-docs')) {
      noticeHeight = parseInt($('.no-latest-notice').outerHeight());
    }
  }, 500);

  $(window).on('resize', function(e) {
    windowHeight = window.innerHeight;
    documentHeight = $(document).outerHeight();
    documentScroll = $(window).scrollTop();
    containerNavHeight = parseInt($('#navbar-globaltoc').outerHeight());
    navHeight = parseInt($('#globaltoc').outerHeight());
    if ($('#page').hasClass('no-latest-docs')) {
      noticeHeight = parseInt($('.no-latest-notice').outerHeight());
    }

    if ($(window).outerWidth() >= 992) {
      $('html').css({'overflow-y': 'auto'});
    }

    adjustLightboxHeight();
  });

  $('#navbar-globaltoc').keydown(function(e) {
    eventScroll = 'keys';
    let arrowKeys = false;
    if (e.which == 38) {
      arrowKeys = true;
      scrollDirection = 'up';
    }
    if (e.which == 40) {
      arrowKeys = true;
      scrollDirection = 'down';
    }
    enableDisableScroll();
    if (arrowKeys) {
      if (disableScroll) {
        return false;
      }
    }
  });

  $(document).keydown(function(e) {
    if (
      (e.which == 38 || e.which == 40) &&
      hoverDocument == 'navbar'
    ) {
      eventScroll = 'keys';
      let arrowKeys = false;
      if (e.which == 38) {
        arrowKeys = true;
        scrollDirection = 'up';
      }
      if (e.which == 40) {
        arrowKeys = true;
        scrollDirection = 'down';
      }
      enableDisableScroll();
      if (arrowKeys) {
        if (disableScroll) {
          return false;
        }
      }
    }
  });

  $(window).on('scroll', function(e) {
    windowHeight = window.innerHeight;
    documentHeight = $(document).outerHeight();
    documentScroll = $(window).scrollTop();
    containerNavHeight = parseInt($('#navbar-globaltoc').outerHeight());
    navHeight = parseInt($('#globaltoc').outerHeight());
  });

  $('.navbar-toggler').on('click', function(e) {
    if ($(this).hasClass('collapsed')) {
      $('html').css({'overflow-y': 'hidden'});
    } else {
      $('html').css({'overflow-y': 'auto'});
    }
  });

  /* Lightbox style fix */
  $('a[data-lightbox]').on('click', function() {
    const topheight = $('body').hasClass('scrolled') ? 101 : 152;
    const topValue = $('.side-scroll').offset().top;
    $('html, body').css('overflow', 'hidden');
    $('#lightboxOverlay').width('100%');
    $('.side-scroll').attr('style', $('.side-scroll').attr('style') + 'position: relative; top: ' + (topValue - topheight) + 'px');
  });

  $('#lightboxOverlay, #lightbox, #lightbox .lb-close').on('click', function(e) {
    $('html, body').css('overflow', '');
    $('.side-scroll').removeAttr('style');
  });

  $('#lightbox .lb-details span, #lightbox .lb-dataContainer :not(.lb-close)').on('click', function(e) {
    e.stopPropagation();
    $('html, body').css('overflow', 'hidden');
  });
  adjustLightboxHeight();

  /**
   * Checks the real height of .no-latest-notice in order to add the appropriate top margin to the lightbox element.
   * If .no-latest-notice is not visible, the margin is zero
   */
  function adjustLightboxHeight() {
    const noLatestElement = $('.no-latest-notice');
    if ( noLatestElement.length > 0) {
      const noLatestHeight = noLatestElement[0].offsetHeight;
      $('#lightbox').css('margin-top', noLatestHeight);
    }
  }

  /* Restore overflow when pressing key 'Esc' */
  $(document).on('keydown', function(e) {
    if (e.keyCode == 27) {
      $('html, body').css('overflow', '');
    }
  });

  /* Add image for the pages with deprecated content -------------------------------------------*/
  $('.dropdown-menu li a').each(function() {
    if ( $(this).text().indexOf(DOCUMENTATION_OPTIONS.VERSION) != -1 && $(this).hasClass('disable') ) {
      $('#rst-content').addClass('deprecated-content');
    }
  });
});
