$(function(){
  var searchbar,
      mainmenu;

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
});
