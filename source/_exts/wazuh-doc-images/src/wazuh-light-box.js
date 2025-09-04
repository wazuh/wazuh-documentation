$(function() {
  const duration = 200;
  const durationExtra = 100;
  const borderWidth = 10;

  $('.wazuh-image').attr('tabindex', 0);

  $(document).on('keyup keypress', function(e) {
    const keyCode = e.keyCode || e.which;

    // Esc
    if (keyCode === 27) {
      if ($('#wazuh-light-box').is(':visible')) {
        closeWazuhLightBox();
      }
    }

    // Left arrow
    if (keyCode === 37) {
      if ($('#wazuh-light-box').is(':visible')) {
        showPrevImage();
      }
    }

    // Right arrow
    if (keyCode === 39) {
      if ($('#wazuh-light-box').is(':visible')) {
        showNextImage();
      }
    }

    // Enter
    if (keyCode === 13) {
      if ( ! $('#wazuh-light-box').is(':visible') && $(e.target).hasClass('wazuh-image') ) {
        openWazuhLightBox($(e.target).attr('id'));
      }
    }
  });

  $('.wazuh-image').on('click', function(e) {
    openWazuhLightBox($(e.target).attr('id'));
  });
  $('#wazuh-light-box-overlay, #wazuh-light-box .wlb-close-button').on('click', closeWazuhLightBox);
  $('#wazuh-light-box .wlb-prev-button').on('click', showPrevImage);
  $('#wazuh-light-box .wlb-next-button').on('click', showNextImage);
  $('#wazuh-light-box .wlb-image').each(function () {
    const image =  this;
    $(image).attr('data-real-width', image.naturalWidth);
    $(image).attr('data-real-height', image.naturalHeight);
  });

  $(document).delegate('.wazuh-light-box-slide.resized', 'click',function () {
    $(this).removeClass('resized').addClass('zoomed');
    $('#wazuh-light-box .wlb-loading').addClass('zoomed');
    $('#wazuh-light-box .wlb-zoom-out-button').addClass('zoomed');
  });
  $('.wlb-zoom-out-button').on('click',function () {
    $('#wazuh-light-box .wazuh-light-box-slide.active').removeClass('zoomed').addClass('resized');
    $('#wazuh-light-box .wlb-loading').removeClass('zoomed');
    $('#wazuh-light-box .wlb-zoom-out-button').removeClass('zoomed');
  });

  /**
   * Open the light box and shows the selected image on it.
   * @param  {string} imageID    The ID of the image.
   */
  function openWazuhLightBox(imageID) {
    const lightBox = $('#wazuh-light-box');
    const lightBoxOverlay = $('#wazuh-light-box-overlay');
    lightBoxOverlay.addClass('wlb-showing');
    lightBoxOverlay.animate(
        {'opacity': 1},
        durationExtra,
        function() {
          lightBoxOverlay.addClass('wlb-visible');
          lightBoxOverlay.removeClass('wlb-showing');
        },
    );
    lightBox.addClass('wlb-showing');
    showLightBoxImage(imageID);
    lightBox.animate(
        {'opacity': 1},
        durationExtra,
        function() {
          $('#wazuh-light-box-overlay, #wazuh-light-box').addClass('wlb-visible');
          $('#wazuh-light-box-overlay, #wazuh-light-box').removeClass('wlb-showing');
          updateBackground(imageID, durationExtra);
          setTimeout(function() {
          }, duration);
        },
    );
    $('body').addClass('no-scroll');

    // Mark or reset the resizable images
    markResized();
  }

  /**
   * Coses the light box with an animation.
   */
  function closeWazuhLightBox() {
    $('#wazuh-light-box-overlay, #wazuh-light-box')
    .animate(
          {'opacity': 0},
          duration,
          function() {
            $('#wazuh-light-box-overlay, #wazuh-light-box').removeClass('wlb-visible');
            $('#wazuh-light-box-overlay, #wazuh-light-box').removeAttr('style');
            hideCurrentLightBoxImage();
          },
    );
    $('#wazuh-light-box .zoomed').removeClass('zoomed');
    $('body').removeClass('no-scroll');
  }

  /**
   * Shows the selected image on the light box (active image)
   * @param  {string} imageID    The ID of the image.
   */
  function showLightBoxImage(imageID) {
    $('#wazuh-light-box [data-image-id="' + imageID + '"]').addClass('active');
    /* Adjust Prev/Next buttons*/
    const indexSlide = parseInt(imageID.split('wazuh_image-')[1]);
    const totalSlide = $('#wazuh-light-box .wazuh-light-box-slide').length;
    if (indexSlide === 0) {
      $('#wazuh-light-box .wlb-prev-button').hide();
      $('#wazuh-light-box .wlb-next-button').show();
    } else if (indexSlide === totalSlide-1) {
      $('#wazuh-light-box .wlb-prev-button').show();
      $('#wazuh-light-box .wlb-next-button').hide();
    } else {
      $('#wazuh-light-box .wlb-prev-button').show();
      $('#wazuh-light-box .wlb-next-button').show();
    }
  }

  /**
   * Hides the currently active image from the light box.
   */
  function hideCurrentLightBoxImage() {
    $('#wazuh-light-box [data-image-id].active').removeClass('active');
  }

  /**
   * Switches the active image to the next one according to the order they appear on the page.
   */
  function showNextImage() {
    const nextID = $('#wazuh-light-box [data-image-id].active').next().attr('data-image-id');
    if ( nextID ) {
      hideCurrentLightBoxImage();
      setTimeout(function() {
        updateBackground(nextID, durationExtra);
        setTimeout(function() {
          showLightBoxImage(nextID);
        }, 0);
      }, 0);
    }
  }

  /**
   * Switches the active image to the previous one according to the order they appear on the page.
   */
  function showPrevImage() {
    const prevID = $('#wazuh-light-box [data-image-id].active').prev().attr('data-image-id');
    if ( prevID ) {
      hideCurrentLightBoxImage();
      setTimeout(function() {
        updateBackground(prevID, durationExtra);
        setTimeout(function() {
          showLightBoxImage(prevID);
        }, 0);
      }, 0);
    }
  }

  /**
   * Adjusts the blank background to match the size of a specific image.
   * @param  {string} imageID       The ID of the image.
   * @param  {number} animationduration   Time for the animation (miliseconds).
   */
  function updateBackground(imageID, animationduration) {
    const imageElement = $('#wazuh-light-box [data-image-id="' + imageID + '"] img');
    const targetSlideImageWrapper = $('#wazuh-light-box  [data-image-id="' + imageID + '"] .wlb-image-wrapper');
    const animationTime = animationduration || 0;
    let newWidth = imageElement.outerWidth();
    let newHeight = imageElement.outerHeight();
    let marginBottom = 40;

    if (targetSlideImageWrapper.parent().hasClass('zoomed')) {
      $('#wazuh-light-box .wlb-loading').addClass('zoomed');
      $('#wazuh-light-box .wlb-zoom-out-button').addClass('zoomed');
    } else {
      $('#wazuh-light-box .wlb-loading').removeClass('zoomed');
      $('#wazuh-light-box .wlb-zoom-out-button').removeClass('zoomed');
    }
    $('#wazuh-light-box .wlb-loading').animate({'width': newWidth + 'px', 'height': newHeight + 'px', 'margin-bottom': marginBottom + 'px'}, animationTime);
  }

  /**
   * Marks the image as resized when displayed element is smaller than the real 
   * size of the image.
   */
  function markResized (){
    $('#wazuh-light-box .wlb-image').each(function () {
      const imageSlide =  this.closest('.wazuh-light-box-slide');
      const elementWidth = $(this).outerWidth() - 2 * borderWidth;
      const elementHeight = $(this).outerHeight() - 2 * borderWidth;
      const realWidth = $(this).attr('data-real-width');
      const realHeight = $(this).attr('data-real-height');
      if (realWidth <= elementWidth && realHeight <= elementHeight){
        $(imageSlide).removeClass('resized');
      } else {
        $(imageSlide).addClass('resized');
      }
    });
  }

  $(window).on('resize', function() {
    const imageID = $('#wazuh-light-box [data-image-id].active').attr('data-image-id');
    markResized();
    updateBackground(imageID, null);
  });
});
