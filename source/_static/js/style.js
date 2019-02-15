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

  checkTocScrollTop($(document).scrollTop(), mainTop);
	checkTocScrollBottom($(document).scrollTop()+windowHeight, mainBottom);

	// Find current page section in globaltoc
	$('.globaltoc .toctree-l2.current a').each(function(e){
		if (!$(this).siblings('ul').length){
			$(this).addClass('leaf');
		}
	});

	$(window).on('hashchange',function(e){
		console.log(e);
		loc = location.hash;
		$('.globaltoc .leaf').removeClass('current');
		selectLeaf(loc);
	});

	function selectLeaf(hash){
		if (hash.length > 0) {
			$('.globaltoc [href="'+hash+'"]').addClass('current');
		}
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


 //IE, Opera, Safari
 $(document).bind('wheel', function(e){
	 console.log('IE, Opera, Safari, Chrome');
	 var tocWrapperBottom = windowHeight-parseInt(tocWrapperElement.css('top').replace('px',''));
	 var tocHeight = $('.globaltoc > ul').height();
	 var tocBottom = tocHeight + gTocScroll;
	 if ($(e.target).closest('.full-toctree-nav').length){
      e.preventDefault();
      // Controlling scroll top limit
			if ( e.originalEvent.wheelDelta > 0  ){
				// When globa TOC menu is not showing its top
				gTocScroll +=e.originalEvent.wheelDelta;
				if (gTocScroll > 0) {
					gTocScroll = 0;
				}
			}

			// Controlling scroll bottom litmit
			if(e.originalEvent.wheelDelta < 0) {
				gTocScroll +=e.originalEvent.wheelDelta;
				if ( tocWrapperBottom - tocBottom > 0 ){
					gTocScroll += (tocWrapperBottom - tocBottom + 56);
				}
			}
		gTocElement.css('top', gTocScroll);
   } else {
     // Whole page scroll
   }
 });

  $(window).on('scroll', function(e){
    var scrollYTopPosition = e.currentTarget.pageYOffset;
    var scrollYBottomPosition = scrollYTopPosition+$(window).height();
    checkTocScrollTop(scrollYTopPosition, mainTop);
		checkTocScrollBottom(scrollYBottomPosition, mainBottom);

    /* Back to top button */
    if ( scrollYTopPosition >= $(window).height()*.50 ){
      $('#btn-scroll').fadeIn('slow');
    }
    else {
      $('#btn-scroll').fadeOut('slow');
    }
  });

	$(window).on('resize', function(e) {
		// Recalculate values and gTocScroll
	});

	function checkTocScrollTop(scrollYTopPosition, containerTop){
		if ( scrollYTopPosition <= containerTop ){
      tocWrapperElement.css('top', containerTop-scrollYTopPosition);
    } else {
      // when header is scrolled up and disappear from the window
      tocWrapperElement.css('top', 0 );
    }
	}

	function checkTocScrollBottom(scrollYBottomPosition, containerBottom){
		tocWrapperElement.css('bottom', scrollYBottomPosition-containerBottom+gTocSpaceBottom );
	}
});
