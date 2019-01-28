$(function(){
  var searchbar,
      mainmenu,
      form_control,
      querystr = '';

  /* Form style ---------------------------------------------------------------------------------------*/
  $(".cv input[type=file]").on("change", function (){
    /* Show file name in file input box */
    $(".file-upload-text").text($(this).prop('files')[0].name);
  });

  $("form select").on("change", function (e){
    if (e.target.value == ''){
      $(e.target).removeClass('selection');
    } else {
      $(e.target).addClass('selection');
    }
  });

  /* Website search bar ----------------------------------------------------------------------------------------------------*/
  /* Search bar animation */
  searchbar = $('.widget_search .search_main');
  mainmenu = $('.widget_search .main-menu');
  form_control = $('.search_main .form-control');

  form_control.on('change', function(e){
    querystr = e.target.value;
    form_control.each(function (current_e) {
      console.log(current_e.target);
    });
  });

  $('.search_main .btn-search, .searchbox-indicator .btn-search').on('click', function(e){  /* Search button clicked */
    if (searchbar.hasClass('collapsed')) {
      e.preventDefault();
      /* If collapsed, expand search bar */
      searchbar.addClass('expanded').removeClass('collapsed');
      mainmenu.addClass('collapsed').removeClass('expanded');

      /* Search input get focus just after search bar is expanded */
      setTimeout(function(){
        $('.widget_search .search_main .form-control').focus();
      },300);
    }
    if ( !querystr.length ){
      e.preventDefault();
    }
  });

  /* Behavior when clicking out of the input field: collapse search bar except when search button is clicked */
  $('.widget_search .search_main .form-control').on('focusout', function(e){
    if ( !$(e.relatedTarget).is($('.search_main .btn-search'))) {
      searchbar.addClass('collapsed').removeClass('expanded');
      mainmenu.addClass('expanded').removeClass('collapsed');
    }
  });

  $('.widget_search .search_main .btn-close').on('click', function(e) {
    searchbar.addClass('collapsed').removeClass('expanded');
    mainmenu.addClass('expanded').removeClass('collapsed');
  })

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
});
