$(function(){
  var searchbar,
      mainmenu;
  var checkboxwraper;

  /* WordPress Contact Form 7 style ---------------------------------------------------------------------------------------*/
  $(".cv input[type=file]").on("change", function (){
    /* Show file name in CV file input box */
    $(".file-upload-text").text($(this).prop('files')[0].name);
  });

  $(".wpcf7-form select").on("change", function (e){
    if (e.target.value == ''){
      $(e.target).removeClass('selection');
    } else {
      $(e.target).addClass('selection');
    }
  });

  $(".gotoform").on("click", function (){
    var formpos = $('#application-form').offset().top-100;
    $("html, body").animate({ scrollTop: formpos }, "slow");
    return false;
  });

  /* Website search bar ----------------------------------------------------------------------------------------------------*/
  /* Search bar animation */
  searchbar = $('#main-menu-search-bar .search_main');
  mainmenu = $('#main-menu-search-bar .main-menu');
  querystr = $('.search_main .form-control');

  // Avoid searching when input field is empty or contains only the placeholder text
  $('.search_main .searchform').on('submit', function(e){
    if (querystr.val() === '' || querystr.val() === 'Search here') {
      e.preventDefault();
    }
  });

  $('.search_main .btn-search, .searchbox-indicator .btn-search').on('click', function(e){  /* Search button clicked */
    if (searchbar.hasClass('collapsed')) {

      /* If collapsed, expand search bar */
      searchbar.addClass('expanded').removeClass('collapsed');
      mainmenu.addClass('collapsed').removeClass('expanded');

      /* Search input get focus just after search bar is expanded */
      setTimeout(function(){
        $('#main-menu-search-bar .search_main .form-control').focus();
      },300);

      /* Allows cleaning input field when starting to write. Note start_writing() and stop_writing() call each other */
      function start_writing(e){
        var code = e.keyCode || e.which;

        $(this).addClass('writing');
        $(this).val('');
        $(this).off('keydown');

        /* Removes filter tag when input field is empty by pressing backspace key */
        if( code == 8){
          $('.search_main .filter, .search_main .search-filter').remove();
        }

        $('.search_main .form-control.writing').on('keyup', stop_writing);
      }

      function stop_writing(){
        var el = $(this);
        var val = $(this).val();
        if (val == '') {
          el.val('Search here').off('keyup').removeClass('writing');
          this.setSelectionRange(0, 0); // Moves cursor to the beginnig of the input field

          $('.search_main .form-control:not(.writing)').on('keydown', start_writing);
        }
      }

      $('.search_main .form-control:not(.writing)').on('keydown', start_writing);

    }
    else {
      /* If search bar not collapsed, submit form */
        $('.search_main .btn-search').prop('type','submit').submit();
    }
  });

  /* Behavior when clicking out of the input field: collapse search bar except when search button is clicked */
  $('.search_main .form-control').on('focusout', function(e){
    $('.search_main .form-control.writing').removeClass('writing');
    if ( !$(e.relatedTarget).is($('.search_main .btn-search'))) {
      searchbar.addClass('collapsed').removeClass('expanded');
      mainmenu.addClass('expanded').removeClass('collapsed');
    }
  });

  /* Behavior when clicking out of the input field: collapse search bar except when search button is clicked */
  $('.search_main .search-filter').on('click', function(e){
    $('.search_main .filter, .search_main .search-filter').remove();
    $('.search_main .btn-search').click(); // Prevents search bar from collapsing
  });

  /* Page scroll event--------------------------------------------------------------------------------------------------*/
  $('#btn-scroll').on('click', function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  if( document.documentElement.scrollHeight-38 > document.documentElement.clientHeight ) { // 38 is the height of Wazuh's social bar on top of the page
  // Scroll-down animation will only be availabloe on pages longer than the client's viewports height
  $(document).on('scroll', function(){
    var scrollvalue = $(document).scrollTop();

    /* When scroll is down, class .scrolled-down affects header style */
    if ( scrollvalue >= 1 ){
      $('body').addClass('scrolled-down');
    }
    else {
      $('body').removeClass('scrolled-down');
    }

    /* Back to top button */
    if ( scrollvalue >= $(window).height()*.50 ){
      $('#btn-scroll').fadeIn('slow');
    }
    else {
      $('#btn-scroll').fadeOut('slow');
    }

  });
}

  if ($('#product-boxes')[0]) { /* Shows a particular capability on homepage's capability selector */
    product_selector(product);
  }

  if ($('#nav-usecases')[0] && product) { /* Moves to a particular usecase on page Product */
    product_anchor(product);
  }

});

/* Products / capabilities selectors ----------------------------------------------------------------------------------------------------*/
var product = window.location.hash.substr(1);


function product_selector(product){
  // product represents the URL's hash passed as paramenter
  // If no hash found fist element is set to active
  // If hash exists the corresponding product is selected

  var resizeTimer; // Used to avoid bouncing effect on resize

  if ( !product || !product.length ){
    product = $('.product-description:first').data('product');
  }
  else {
    window.location.hash = '';
  }

  $('[data-product='+product+']').addClass('active');

  var shouldscroll = $('.page-product').length;
  if (shouldscroll) {
    var top = $('.product-description[data-product='+product+']').offset().top - 150;
    $("html, body").animate({ scrollTop: top }, "slow");
  }

  //Product selection on click
  $('.product-box a').on('click', function(e){
    product = $(e.target).closest('.product-box').data('product');

    $('[data-product]').removeClass('active');
    $('[data-product='+product+']').addClass('active');

    // No scroll
    return false;
  });

  $('.product-left, .product-right').on('click', function(e){
    var container = $(".home .product-description-container");
    var slides = $(".product-description");
    var slidewidth = container.width() / slides.length;
    var wrapperleft = container.parent().offset().left;
    var oldslide = $(".product-description.active");
    var slidenum = parseInt(oldslide.data("slide"));

    if ( $(e.target).hasClass("product-left")){
      slidenum--;
      if (slidenum < 0) {
        slidenum = slides.length - 1 ;
      }
    } else {
      slidenum++;
      slidenum = slidenum % (slides.length);
    }

    product = $("[data-slide='" + slidenum + "']").data("product");

    var newleft = -slidewidth * (slidenum);

    $('[data-product]').addClass('oldactive').removeClass('active');
    $('[data-product='+product+']').addClass('active');

    container.animate({"left": newleft},200, function(){
      $(".oldactive").removeClass('oldactive');
    });
  });

  $(window).on('resize', function(e){
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function() {
      if ($( '#product-boxes').length ){
        // Only run when section #product-boxes is present
        $(".home .product-description-container,").css("opacity", 0);
        if ( $("body").width() >= 768) {
          $(".home .product-description-container").removeAttr("style");
        }
        else {
          update_slide();
        }
        $(".home .product-description-container").css("opacity", 1);
      }
    }, 250);

  });

  function update_slide(){
    var container = $(".home .product-description-container");
    var slidewidth = container.width() / $(".product-description").length;
    var wrapperleft = container.parent().offset().left;
    var slidenum = $(".product-description.active").data("slide");

    var newleft = -slidewidth * slidenum;

    container.css( "left", newleft );

  }

}

function product_anchor(product){
  var usecases = [];
  var top = 0;
  var scrollOffset = 150;

  // Getting usecases from page Product
  $('#nav-usecases section[name]').each( function(){
      usecases.push($(this).attr('name'));
    }
  )

  // Anchor validation
  if ( usecases.indexOf(product) > -1 ){
    $('#nav-usecases-tab').click();
    $('#nav-usecases').delay(500).queue(function(){
      top = $('[name='+product+']').offset().top - scrollOffset;
      $("html, body").animate({ scrollTop: top }, "slow");
      $( this ).dequeue();
    });
  }
}
