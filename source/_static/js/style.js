$(function(){
  var searchbar,
      mainmenu,
      form_control,
      querystr = '',
			loc = location.hash;
  var mainElement = $('.central-page-area'),
      tocWrapperElement = $('nav.full-toctree-nav'),
			gTocElement = $('nav.full-toctree-nav .globaltoc'),
      footerElement = $('#main-footer');
  var winScroll = 0,
      gTocScroll = 0,
      pageHeight = $('body').height(),
      windowHeight = $(window).height(),
      mainTop = mainElement.offset().top,
      mainBottom = footerElement.offset().top
			gTocSpaceBottom = 15,
      gTocSpaceTop = $('#search-lg').height();

			changeVerionPosition($(window).width());
      changeSearchPosition($(window).width());
      adjustSearchbarIndex();

	// Finds current page section in globaltoc
	$('.globaltoc .toctree-l2.current a').each(function(e){
		if (!$(this).siblings('ul').length){
			$(this).addClass('leaf');
		}
	});

	$(window).on('hashchange', updateFromHash);

	function updateFromHash(){
		loc = location.hash;
		console.log(loc);
		$('.globaltoc .leaf, .globaltoc a.current').removeClass('current');
		selectLeaf(loc);
	}

	function selectLeaf(hash){
		if (hash.length > 0) {
			$('.globaltoc [href="'+hash+'"]').addClass('current');
		} else {
			$('.globaltoc [href="#"]').addClass('current');
		}
	}

  /* Turn all tables in responsive table */
  reponsiveTables();

  function reponsiveTables(){
    $('#main-content table').each(function(){
      if ( $(this).width() > $('main').width()){
        $(this).addClass('table-responsive');
      }
    });
  }

  /* Search bar ----------------------------------------------------------------------------------------------------*/
  /* Search bar animation */
  searchbar = $('.widget_search .search_main');
  mainmenu = $('.widget_search .main-menu');
  form_control = $('.search_main .form-control');

  form_control.on('change', function(e){
    querystr = e.target.value;
    form_control.each(function (current_e) {
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

  $(window).on('scroll', function(e){
   //console.log(e.currentTarget);
   var scrollYTopPosition = e.currentTarget.pageYOffset;

   // Back to top button
   if ( scrollYTopPosition >= $(window).height()*.50 ){
     $('#btn-scroll').fadeIn('slow');
   }
   else {
     $('#btn-scroll').fadeOut('slow');
   }

	 // Searchbar position control on page index
   adjustSearchbarIndex();

 });

 function adjustSearchbarIndex(){
   if ( $('#page.index').length > 0 && $(document).scrollTop() > $('#search-lg').offset().top ) {
    // Page scrolled down
    searcbarToMobile();
		$('#search-lg').removeClass('collapsed');
    $('#search-lg .search_main').show();
  }

  if ( $('#page.index').length > 0 && $(document).scrollTop() <= $('#search-lg').offset().top ) {
    // Page not scrolled down
    searcbarToDesktop();
		$('#search-lg').addClass('collapsed');
    $('#search-lg .search_main').hide();
  }
 }

	/* Collapsible globaltoc -------------------------------------------------------------------------------------------*/
	$('#btn-collapse-globaltoc').on('click', function(){
		var gtwith = tocWrapperElement.width();
		tocWrapperElement.addClass('collapsed');
		tocWrapperElement.animate({'left': (0 - gtwith)+'px'}, function(){
      //$(this).hide();
      $('#main-content').addClass('full-width');
		});
	});

  $('#btn-uncollapse-globaltoc').on('click', function(){
			tocWrapperElement.removeClass('collapsed');

   tocWrapperElement.animate({'left': 0});
	 $('#main-content').removeClass('full-width');
  });

	 $(window).on('resize', function(e){
		 var curWidth = $(this).width();
     $('table').removeClass('table-responsive');
     reponsiveTables();
		 changeVerionPosition(curWidth);
     changeSearchPosition(curWidth);
	 });


	function changeVerionPosition (currentWidth) {
		if (currentWidth > 991) {
			versionToDesktop();
		} else {
			versionToMobile();
		}
	}

  function versionToDesktop (){
    var vSelector = $('.release-selector-wrapper');
    if (vSelector.closest('#main-navbar').length > 0 ){
      // Selector in #main-navbar: change to .version-zone:
      vSelector.prependTo($('.version-zone'));
    }
  }

	function versionToMobile (){
		var vSelector = $('.release-selector-wrapper');
		if (vSelector.closest('.version-zone').length > 0 ){
			// Selector in .version-zone: change to #main-navbar
			vSelector.appendTo($('#main-navbar'));
		}

	}

  function changeSearchPosition (currentWidth){
    if (currentWidth > 991) {
			searcbarToDesktop();
		} else {
			searcbarToMobile();
		}
  }

  function searcbarToDesktop(){
    if ($('#page.index').length > 0) {
      // Only for index page
      var searchbar = $('.search_main');
      if (searchbar.closest('#search-lg').length > 0 ){
        // Search bar in #search-lg: change to .main-head .container:
        searchbar.appendTo($('.main-head .container'));
      }
    }
  }

  function searcbarToMobile(){
    if ($('#page.index').length > 0) {
      // Only for index page
      var searchbar = $('.search_main');
  		if (searchbar.closest('.main-head').length > 0 ){
  			// Search bar in .main-head .container: change to #search-lg
  			searchbar.appendTo($('#search-lg'));
  		}
    }
  }
});
