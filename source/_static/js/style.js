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
  var breakpoint = 992;

  changeVerionPosition($(window).width());
  changeSearchPosition($(window).width());
  //adjustSearchbarIndex();

	// Finds current page section in globaltoc
	$('.globaltoc .toctree-l2.current a').each(function(e){
		if (!$(this).siblings('ul').length){
			$(this).addClass('leaf');
		}
	});

	$(window).on('hashchange', updateFromHash);

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

 });

	/* Global toc --------------------------------------------------------------------------------------------------*/
  function currentToc(){
    var href;
    // Gets the name of the first level folder
		category = document.location.pathname.split('/')[2]; // [2] The URL contains the version; [1]	for URLs without version
		category = (category.indexOf('.') < 0)?category:'';

    $('#menu-submenu').find('li').each(function(){
			if ($(this).children('a').attr('href').indexOf(category) >= 0 && category.length > 0 ) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});

    if ($(window).width() >= breakpoint ){
      gTocElement.find('a').each(function(){
        href = $(this).prop('href');
				if (href.indexOf(category+'/index.html') > 0 || href.indexOf(category+'/#') > 0){
					$(this).css('display', 'none');
				}
        if ( href.indexOf(category) < 0 ){
          $(this).closest('.toctree-l1').css('display', 'none');
        } else {
          $(this).closest('.toctree-l1').css('display', 'block');
        }
      });
    } else {
			$('.toctree-l1').css('display', 'block');
		}

  }

   currentToc();

	/* Resize event --------------------------------------------------------------------------------------------------*/
	 $(window).on('resize', function(e){
		 var curWidth = $(this).width();
     $('table').removeClass('table-responsive');
     reponsiveTables();
     changeVerionPosition(curWidth);
     changeSearchPosition(curWidth);
		 currentToc();
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
});
