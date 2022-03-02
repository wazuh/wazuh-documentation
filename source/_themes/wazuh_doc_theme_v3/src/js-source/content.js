/* -----------------------------------------------------------------------------
  Regular documentation content page
----------------------------------------------------------------------------- */

if ( $('.document') ) {
  /* Control the capabilitys screenshot slides in the home page ------------- */
  /* The slider for the capabilities changed from 3.13 on to show a screenshot
   * per capability */
  // const intervalTime = 5000;
  // let capaInterval = null;
  // const minVersionScreenshot = '3.13';
  // const simultaneousCapaSlide = (compareVersion(DOCUMENTATION_OPTIONS.VERSION, minVersionScreenshot) >= 0);

  /* Add functionality for the capabilities in the home page */
  // if ($(window).outerWidth() < 1200) {
  //   $('#capabilities .left .topic.active p').not('.topic-title').slideDown(300);
  // }

  // $(window).resize(function() {
  //   clearInterval(capaInterval);
  //   if ($(window).outerWidth() >= 1200) {
  //     if (simultaneousCapaSlide) {
  //       initCapabilities();
  //     }
  //     $('#capabilities .left .topic p').not('.topic-title').css({'display': 'none'});
  //     if ($('#capabilities .left .topic.active').length > 0) {
  //       capabilitiesHome($('#capabilities .left .topic.active'));
  //     } else {
  //       capabilitiesHome($('#capabilities .left .topic').first());
  //     }
  //   } else {
  //     if (simultaneousCapaSlide) {
  //       stopCapabilities();
  //     }
  //     $('#capabilities .left .topic.active p').not('.topic-title').css({'display': 'block'});
  //   }
  // });

  // $('#capabilities .left .topic').click(function() {
  //   capabilitiesHome(this, simultaneousCapaSlide);
  // });

  // if ($(window).outerWidth() >= 1200 && simultaneousCapaSlide ) {
  //   initCapabilities();
  // }

  // if ( simultaneousCapaSlide ) {
  //   $('.screenshots .carousel').carousel({
  //     interval: intervalTime,
  //   });
  //
  //   $('.capab .topic, .screenshots .carousel').on('click', function() {
  //     $('.carousel').carousel('pause');
  //     clearInterval(capaInterval);
  //   });
  // }

  /**
  * Initialices part of the functionality of the capability selection in the home page
  */
  // function initCapabilities() {
  //   capaInterval = setInterval(function() {
  //     changeCapabilityNext(true);
  //   }, intervalTime);
  //
  //   $('.screenshots .carousel .carousel-control-prev,
  //     .screenshots .carousel .carousel-control-next').click(function() {
  //     /* Update the selected capability to the correct one only when the slide animation has started */
  //     $('.screenshots .carousel').one('slide.bs.carousel', function(carousel) {
  //       changeCapabilityTo(carousel.to, false);
  //     });
  //   });
  // }

  /**
  * Stops part of the functionality of the capability selection in the home page
  */
  // function stopCapabilities() {
  //   $('.screenshots .carousel .carousel-control-prev, .screenshots .carousel .carousel-control-next').off();
  // }


  /**
   * Given an index (capaindex), change the active capability.
   * @param {int} capaindex Index of the capability to be selected
   * @param {boolean} auto Indicates whether the carousel slide must be automatically updated (true) or not (false)
   */
  // function changeCapabilityTo(capaindex, auto) {
  //   const topics = $('#capabilities .left .topic');
  //   capabilitiesHome(topics.eq(capaindex), auto);
  // }

  /**
   * Change the active capability to the next one.
   * @param {boolean} auto Indicates whether the carousel slide must be automatically updated (true) or not (false)
   */
  // function changeCapabilityNext(auto) {
  //   const topics = $('#capabilities .left .topic');
  //   const active = $('#capabilities .left .topic.active');
  //   let capaindex = topics.index(active);
  //   capaindex = (capaindex+1) % topics.length;
  //   capabilitiesHome(topics.eq(capaindex), auto);
  // }

  /**
   * Only for main index (documentation's home page).
   * Functionality of the capabilities section: selects capability, controls the responsive behavior, etc.
   * @param {DOMObject} ele Element containing the capability currently selected (active) or clicked.
   * @param {boolean} auto Indicates whether the carousel slide must be automatically updated (true) or not (false)
   */
  // function capabilitiesHome(ele, auto) {
  //   let eleOther = ele;
  //   let active = false;
  //   const item = $('#capabilities .left .topic').index(ele);
  //
  //   if ($('#page.index').length > 0) {
  //     if ($(ele).hasClass('active')) {
  //       active = true;
  //     } else {
  //       eleOther = $('#capabilities .left .topic.active');
  //     }
  //     if ($('#capabilities .left .topic.active').length <= 0) {
  //       eleOther = false;
  //     }
  //
  //     /* Update slider */
  //     if ( auto ) {
  //       $('.screenshots .carousel').carousel(item);
  //     }
  //
  //     if ($(window).outerWidth() >= 1200) {
  //       let className = '';
  //       className = $(ele).attr('class');
  //       className = className.replace(' topic', '');
  //       className = className.replace(' active', '');
  //       const posBox = $('#capabilities .left').offset();
  //       const posTopic = $(ele).offset();
  //       $('#capabilities .topic').removeClass('active');
  //       $('#capabilities .right .topic.' + className).addClass('active');
  //       let pos = posTopic.top - posBox.top - 4;
  //       if (pos <= 0) {
  //         pos = 0;
  //       }
  //       $('#capabilities .line').css({'height': pos + 'px'});
  //       $(ele).addClass('active');
  //     } else {
  //       if (eleOther != false) {
  //         $(eleOther).find('p').not('.topic-title').slideUp(300, function() {
  //           setTimeout(function() {
  //             $(eleOther).removeClass('active');
  //           }, 100);
  //           setTimeout(function() {
  //             if (!active) {
  //               $(ele).addClass('active');
  //               $(ele).find('p').not('.topic-title').slideDown(300);
  //             }
  //           }, 100);
  //         });
  //       } else {
  //         $(ele).addClass('active');
  //         $(ele).find('p').not('.topic-title').slideDown(300);
  //       }
  //     }
  //   }
  // }

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

  /* Table adjustments----------------------- ------------------------------- */
  $('table.docutils:not(.list-rows)').each(function() {
    /* Table wrapper and table with header */
    if ( !$(this).hasClass('release-notes') ) {
      if ( $(this).find('thead').length > 0 ) {
        $(this).wrap('<div class="table-wrapper w-header"/>');
      } else {
        $(this).wrap('<div class="table-wrapper"/>');
      }
    }

    /* Table with caption */
    const caption = $(this).find('caption');
    if ( caption.length > 0 ) {
      const parent = $(this).closest('.table-wrapper');
      if ( parent.length > 0 ) {
        parent.append(caption);
      }
    }
  });
}
