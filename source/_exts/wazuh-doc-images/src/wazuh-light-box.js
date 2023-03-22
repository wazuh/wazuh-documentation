$(function() {
  const duration = 200;
  const durationExtra = 100;

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
  }

  /**
   * Shows the selected image on the light box (active image)
   * @param  {string} imageID    The ID of the image.
   */
  function showLightBoxImage(imageID) {
    $('#wazuh-light-box [data-image-id="' + imageID + '"]').addClass('active');
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
    const newWidth = imageElement.outerWidth();
    const newHeight = imageElement.outerHeight();
    const animationTime = animationduration || 0;
    $('#wazuh-light-box .wlb-loading').animate({'width': newWidth + 'px', 'height': newHeight + 'px'}, animationTime);
  }

  $(window).on('resize', function() {
    const imageID = $('#wazuh-light-box [data-image-id].active').attr('data-image-id');
    updateBackground(imageID, null);
  });
});
