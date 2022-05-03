/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): admonitions.js
 * --------------------------------------------------------------------------
 */

$(function() {
  $('.admonition').each(function() {
    const admonition = $(this);
    if ( !admonition.hasClass('long') && !admonition.hasClass('not-long') ) {
      if ( admonition.children().length > 2 ) {
        admonition.addClass('long');
      } else {
        const lengthThreshold = 300;
        if ( admonition.children(':nth-child(2)').text().length > lengthThreshold ) {
          admonition.addClass('long');
        }
      }
    }
  });
});
