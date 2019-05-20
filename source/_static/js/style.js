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
  var breakpoint = 992,
			spaceBeforeAnchor = 60;

  changeVerionPosition($(window).outerWidth());
  changeSearchPosition($(window).outerWidth());
	checkScroll();
  if (document.location.hash) {
		correctScrollTo(spaceBeforeAnchor);
  }

	// Finds current page section in globaltoc
	$('.globaltoc .toctree-l2.current a').each(function(e){
		if (!$(this).siblings('ul').length){
			$(this).addClass('leaf');
		}
	});

	show_current_subtree();

	$(window).on('hashchange', function(){
		updateFromHash();
		correctScrollTo(spaceBeforeAnchor);
	});

	function updateFromHash(){
		loc = location.hash;
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

  // Toggle globaltoc in small devices
   $('.menu-sub .navbar-expand-lg').click(function (){

	 });

  /* Page scroll event --------------------------------------------------------------------------------------------------*/
  $('#btn-scroll').on('click', function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  $(window).on('scroll', function(e){
   var scrollYTopPosition = e.currentTarget.pageYOffset;

   // Back to top button
   if ( scrollYTopPosition >= $(window).height()*.50 ){
     $('#btn-scroll').fadeIn('slow');
   }
   else {
     $('#btn-scroll').fadeOut('slow');
   }

	 checkScroll();

 });

 function checkScroll(){
   var submenuYpos = $('.menu-sub')[0].offsetTop;
   var headerHeight = Math.round($('.header').height());
   if (submenuYpos > headerHeight ) {
     $('body').addClass('scrolled');
   } else {
     $('body').removeClass('scrolled');
   }
 }

	/* Global toc --------------------------------------------------------------------------------------------------*/
  function currentToc(){
    var href;
    // Gets the name of the first level folder
    category = document.location.pathname.split('/')[2]; // [2] The URL contains the version; [1]	for URLs without version
    category = (category && category.indexOf('.') < 0)?category:'';

    /* Highlight current category from #menu-submenu */
    $('#menu-submenu').find('li').each(function(){
      if ($(this).children('a').attr('href').indexOf(category) >= 0 && category.length > 0 ) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  currentToc();

  // Closes the dropdown globaltoc when one of its elements has been clicked/tapped in small devices
  $('.globaltoc a').on('click', function(){
    if( $(window).outerWidth() < breakpoint ){
      $('.btn-close').click()
    }
  });

  /* Toggle collapse */
  $('.globaltoc a').on('click', function(e){
		// Normal link: avoid toggle if current menu item doesn't have submenu
		li = $(e.target).closest('li');
		if (!li || li.children('ul').length == 0 ){
			return true;
		}

		e.stopPropagation();
		e.preventDefault();

		// Disables toc.html and localtoc links
		if( li.hasClass('show')){
			li.removeClass('show');
		} else {
			li.addClass('show');
		}
		return false;
   });

	 function show_current_subtree(){
		 updateFromHash();
		 var currentLeaf = $('.globaltoc a.current.leaf');
		 if (currentLeaf.length == 0){
			 currentLeaf = $('.globaltoc [href="#"].current');
		 }
		 currentLeaf.parents('li').each(function(){
			 $(this).addClass('show');
		 });
	 }

	/* Resize event --------------------------------------------------------------------------------------------------*/
	 $(window).on('resize', function(e){
		 var curWidth = $(this).outerWidth();
     $('table').removeClass('table-responsive');
     reponsiveTables();
     changeVerionPosition(curWidth);
     changeSearchPosition(curWidth);
		 currentToc();

		 checkScroll();
	 });

	function changeVerionPosition (currentWidth) {
		if (currentWidth >= breakpoint) {
			versionToDesktop();
		} else {
			versionToMobile();
		}
	}

  function versionToDesktop (){
    var vSelector = $('.release-selector-wrapper');
    if (vSelector.closest('#main-navbar').length > 0 ){
      // Selector in #main-navbar: change to .version-zone:
      vSelector.appendTo($('.version-zone'));
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
    if (currentWidth >= breakpoint) {
			searcbarToDesktop();
		} else {
			searcbarToMobile();
		}
  }

  function searcbarToDesktop(){
    var searchbar = $('.search_main');
    if (searchbar.closest('.blue-bar').length > 0 ){
      // Search bar in .blue-bar .container: change to #search-lg
      searchbar.appendTo($('#search-lg'));
    }
  }

  function searcbarToMobile(){
    var searchbar = $('.search_main');
    if (searchbar.closest('#search-lg').length > 0 ){
      // Search bar in #search-lg: change to .blue-bar .container:
      searchbar.appendTo($('.blue-bar'));
    }
  }

	// Corrects the scrolling movement so the element to which the page is being scrolled appears in the screen, having in mind the fixed top bar.
	function correctScrollTo(spaceBeforeAnchor){
    if( $('#page').hasClass('no-latest-docs') ) {
			spaceBeforeAnchor = spaceBeforeAnchor + 40;
		}
		setTimeout(function(){
			window.scrollTo(window.scrollX, window.scrollY - spaceBeforeAnchor);
    }, 10);
	}
});
