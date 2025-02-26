/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): back-to-top.js
 * --------------------------------------------------------------------------
 */

$(function() {
  $(document).on('scroll', function(){
    var scrollvalue = $(document).scrollTop();
    
    /* Button appears on scroll */
    if ( scrollvalue >= jQuery(window).height()*.50 ){
      $('.appear-on-scroll').fadeIn('slow');
    }
    else {
      $('.appear-on-scroll').fadeOut('slow');
    }

  });
  
  $('.appear-on-scroll.init-hidden').hide();
  $('.appear-on-scroll.init-hidden').removeClass('init-hidden');
});
