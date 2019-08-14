$(function(){

  var searchbar,
      mainmenu,
      form_control,
      querystr = '',
			loc = location.hash;
	/* var mainElement = $('.central-page-area'),
			tocWrapperElement = $('nav.full-toctree-nav'),
			gTocElement = $('nav.full-toctree-nav .globaltoc'),
			footerElement = $('#main-footer'); */
  var mainElement = $('.central-page-area'),
      tocWrapperElement = $('nav.full-toctree-nav'),
			gTocElement = $('nav.full-toctree-nav .globaltoc');
  var winScroll = 0,
      gTocScroll = 0,
      pageHeight = $('body').height(),
      windowHeight = $(window).height(),
      mainTop = mainElement.offset().top,
      /* mainBottom = footerElement.offset().top */
			gTocSpaceBottom = 15,
      gTocSpaceTop = $('#search-lg').height();
  var breakpoint = 992,
			spaceBeforeAnchor = 60;
	var excludedSearchFolders = ['release-notes']; // List of folders that will be excluded from search

	// List of empty nodes, containing only a toctree
	var empty_toc_nodes = [
		'amazon/configuration/index',
		'compliance',
		'containers',
		'deployment',
		'development/index',
		'docker-monitor/index',
		'installation-guide/upgrading/legacy/index',
    'installation-guide/packages-list/linux/linux-index',
    'installation-guide/packages-list/solaris/solaris-index',
		'monitoring',
		'release-notes/index',
		'user-manual/index',
		'user-manual/agents/index',
		'user-manual/agents/remove-agents/index',
		'user-manual/agents/listing/index',
		'user-manual/kibana-app/reference/index',
		'user-manual/ruleset/ruleset-xml-syntax/index'
	];

  /* list of nodes (by title) which will not show their subtree */
  var hide_subtree_nodes = [
    'Install Wazuh manager on Linux',
    'Install Wazuh agent on Linux'
  ].map(item =>item.toLowerCase());

	mark_toc_nodes_with_class(empty_toc_nodes, 'empty-toc-node');
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

	// Finds all nodes that contains subtrees within the globaltoc and appends a toggle button to them
	$('.globaltoc .toctree-l1 a').each(function(e){
		if ($(this).siblings('ul').length){
			$(this).closest('li').addClass('toc-toggle');
			$(this).append($('<button class="toc-toggle-btn"><span class="toc-toggle-icon"></span></button>'));
		}
	});

	show_current_subtree();
	hide_subtree(hide_subtree_nodes);

	// Show the hidden menu
	setTimeout(function(){ $('#navbar-globaltoc').removeClass('hidden'); }, 500);

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
	 var scrollTop = $(document).scrollTop();
	 var headerHeight = 100;
	 if ($('#page').hasClass('no-latest-docs')) {
		headerHeight += parseInt($('.no-latest-notice').outerHeight());
	 }
   if (scrollTop >= headerHeight ) {
     $('body').addClass('scrolled');
   } else {
     $('body').removeClass('scrolled');
   }
 }

	/* -- Menu scroll -------------------------------------------------------------------------------*/

	var navbar_top = 100;
	var notice_height = 0;
	if ($('#page').hasClass('no-latest-docs')) {
		notice_height = parseInt($('.no-latest-notice').outerHeight());
	}
	
	var delay = navbar_top + 200;
	var window_height = window.innerHeight;
	var document_height = $(document).outerHeight();
	var document_scroll = $(window).scrollTop();
	var container_nav_height = parseInt($('#navbar-globaltoc').outerHeight());
	var nav_height = parseInt($('#globaltoc').outerHeight());
	var page_focus = 'document';
	var page_hover = 'document';
	var page_mouse_wheel = false;
	var navbar_click = false;

	heightNavbar();
	scrollNavbar();
	headerSticky();

	setTimeout(function(){
		if ($('#page').hasClass('no-latest-docs')) {
			notice_height = parseInt($('.no-latest-notice').outerHeight());
		}
	},500);

	$('#navbar').on('mousemove', function(e){
		page_hover = 'nav';
	});

	$('#header, #main-content').on('mousemove', function(e){
		page_hover = 'document';
	});

	$(window).bind('mousewheel DOMMouseScroll', function(e){
		page_mouse_wheel = true;
	}); 

	$(document).keydown(function(e) {
		if (e.which == 38 || e.which == 40) {
			page_mouse_wheel = false;
		}
	});

	$('#navbar a').focus(function(){
		navbar_click = true;
	});

	$('#header, #main-content').click(function(){
		navbar_click = false;
	});

	$(window).on('resize', function(e) {

		window_height = window.innerHeight;
		document_height = $(document).outerHeight();
		document_scroll = $(window).scrollTop();
		container_nav_height = parseInt($('#navbar-globaltoc').outerHeight());
		nav_height = parseInt($('#globaltoc').outerHeight());
		if ($('#page').hasClass('no-latest-docs')) {
			notice_height = parseInt($('.no-latest-notice').outerHeight());
		}

		if ($(window).width() >= 992) {
			$('html').css({'overflow-y':'auto'});
		}

		heightNavbar();
		scrollNavbar();
		
	});

	$('#navbar-globaltoc').on('scroll',function(e) {
		page_focus = 'nav';
	});

	$(window).on('scroll',function(e) {
		
		page_focus = 'document';

		window_height = window.innerHeight;
		document_height = $(document).outerHeight();
		document_scroll = $(window).scrollTop();
		container_nav_height = parseInt($('#navbar-globaltoc').outerHeight());
		nav_height = parseInt($('#globaltoc').outerHeight());
		if ($('#page').hasClass('no-latest-docs')) {
			notice_height = parseInt($('.no-latest-notice').outerHeight());
		}

		/* Update height of navbar */
		heightNavbar();
		/* If the coursor isn't in the navbar */
		if (((page_focus == 'document' && page_hover == 'document') || 
				(page_mouse_wheel && page_focus == 'nav' && page_hover == 'nav') ||
				(!navbar_click && !page_mouse_wheel && page_focus == 'document' && page_hover == 'nav')
			) && $(window).width() >= 992) {
			/* Set the new scroll of navbar */
			scrollNavbar();
		}
		
		headerSticky();

	});

	$('.navbar-toggler').on('click', function(e) {
		if ($(this).hasClass('collapsed')) {
			$('html').css({'overflow-y':'hidden'});
		} else {
			$('html').css({'overflow-y':'auto'});
		}
	});

	function heightNavbar() {

		if ($(window).width() >= 992) {

			if (document_scroll <= navbar_top) {
				$('#navbar').css({'padding-top':(notice_height+navbar_top-document_scroll)+'px'});
				$('#navbar-globaltoc').css({'height':'calc(100vh - 152px - '+ notice_height +'px + '+document_scroll+'px)'});
			} else {
				$('#navbar').css({'padding-top':notice_height});
				$('#navbar-globaltoc').css({'height':'calc(100vh - 152px - '+ notice_height +'px + '+navbar_top+'px)'});
			}
			$('#navbar-globaltoc').css({'padding-top':0});

		} else {

			if (document_scroll <= navbar_top) {
				$('#navbar').css({'padding-top':0});
				$('#navbar-globaltoc').css({'padding-top':(notice_height+100)+'px'});
			} else {
				$('#navbar').css({'padding-top':0});
				$('#navbar-globaltoc').css({'padding-top':(notice_height+52)+'px'});
			}

		}

	}

	function scrollNavbar() {

		scroll_real = document_height-window_height-delay;
		if(scroll_real < 0){
			scroll_real += delay;
			delay = 0;
		}
		nav_scroll_real = nav_height-container_nav_height;
		percentage = ((document_scroll-delay)/scroll_real).toFixed(3);
		nav_scroll_end = (percentage*nav_scroll_real).toFixed();
		if (percentage == 0) { nav_scroll_end = 0; }
		if (percentage == 1) { nav_scroll_end += 20; }

		if (nav_scroll_real >= 0) {
			$('#navbar-globaltoc').scrollTop(nav_scroll_end);
		}
			
	}

	function headerSticky() {

		var document_scroll = $(window).scrollTop();
		if (document_scroll >= (notice_height+100)) {
			$('#header-sticky').css({'top':notice_height});
		} else {
			$('#header-sticky').css({'top':'-52px'});
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

  /* Toggle collapse */
  $('.globaltoc a .toc-toggle-btn').on('click', function(e){
		// Normal link: avoid toggle if current menu item doesn't have submenu
		li = $(e.target).closest('li');
		if (!li || li.children('ul').length == 0 ){
			return true;
		}

		e.stopPropagation();
		e.preventDefault();

		if( li.hasClass('show')){
			li.removeClass('show');
		} else {
			li.siblings('li').removeClass('show');
			li.addClass('show');
		}

		if(!li.parents().hasClass('show')){
			$('.globaltoc li.show').addClass('show');
		}

		$('.globaltoc li.initial').removeClass('initial');
		return false;
   });

	 function show_current_subtree(){
		 updateFromHash();
		 if ($('ul li.toctree-l1 a.current.reference.internal, ul li.toctree-l1 .current > .leaf').length == 0 && !$('#page').hasClass('index') && !$('#page').hasClass('page-404') ){
			 /* Shows the selected style for the parent document of pages that don't appear in the globaltoc */
				$('.globaltoc :contains("'+ $('#breadcrumbs li:nth-last-child(2) a').text() +'")').addClass('show').addClass('current');
			 return true;
		 }
		 var currentLeaf = $('.globaltoc a.current.leaf');
		 if (currentLeaf.length == 0){
			currentLeaf = $('.globaltoc [href="#"].current');
		 }
		 currentLeaf.parents('li').each(function(){
			$(this).addClass('initial').addClass('show');
		 });
		 $('#navbar-globaltoc').removeClass('hidden');
	 }

	 /* Note: this might be improved in the future using a new builder or extension */
	 function mark_toc_nodes_with_class(node_list, class_name){
		 var regex;
		 var cur_location = location.href.split('#')[0];
		 node_list.forEach(function(toc_node){
			 empty_node = '.+\/' + toc_node + '.html';
			 regex = new RegExp( empty_node, 'g');
			 $('.globaltoc a').each(function(){
				 var href = $(this).prop('href').split('#')[0];
				 var is_current = (href === cur_location);
         /* The selected menu link in the globaltoc acts as the toggle button, showing on an off its subtree */
				 if ( regex.test(href) || is_current ) {
					 $(this).addClass(class_name);
				 }
				 if ( is_current ) {
					 $(this).addClass('current-toc-node');
				 }
			 });
		 });
	 }

	 function hide_subtree(node_list){
		 $("#globaltoc a").each(function(){
			 if ( jQuery.inArray( $(this).text().toLowerCase(), node_list ) !== -1 ) {
				 $(this).siblings().hide();
				 $(this).children("button").hide();
			 }
		 });
	 }

	 $('.globaltoc .empty-toc-node').each(function(){
		 $(this).on('click', function(e){
			 e.preventDefault();
			 $(this).find('.toc-toggle-btn').click();
		 });
	 });

	 /* Scrolls up when clicking current toctree node */
	 $('.globaltoc .current-toc-node').each(function(){
		 $(this).on('click', function(e){
			 e.preventDefault();
			 $("html, body").animate({ scrollTop: 0 }, "500");
		 });
	 });

	/* Resize event --------------------------------------------------------------------------------------------------*/
	 $(window).on('resize', function(e){
		 var curWidth = $(this).outerWidth();
     $('table').removeClass('table-responsive');
     reponsiveTables();
		 currentToc();

		 checkScroll();
	 });

	// Corrects the scrolling movement so the element to which the page is being scrolled appears in the screen, having in mind the fixed top bar.
	function correctScrollTo(spaceBeforeAnchor){
    if( $('#page').hasClass('no-latest-docs') ) {
			spaceBeforeAnchor = spaceBeforeAnchor + 40;
		}
		setTimeout(function(){
			window.scrollTo(window.scrollX, window.scrollY - spaceBeforeAnchor);
    }, 10);
	}

	/* -- Add funcionability for cloud-info ---------------------------------------------------------------------------------- */

	if($(window).width() < 1200){
		$('#capabilities .left .topic.active p').not('.topic-title').slideDown(300);
	}

	$(window).resize(function(){
		if($(window).width() >= 1200){
			$('#capabilities .left .topic p').not('.topic-title').css({'display':'none'});
			if($('#capabilities .left .topic.active').length > 0){
				capabilitiesHome($('#capabilities .left .topic.active'));
			} else {
				capabilitiesHome($('#capabilities .left .topic').first());
			}
		} else {
			$('#capabilities .left .topic.active p').not('.topic-title').css({'display':'block'});
		}
	});

	$('#capabilities .left .topic').click(function(){
		capabilitiesHome(this);
	});

	function capabilitiesHome(ele){

    var ele_other = ele;
    var active = false;

    if ( $('#page.index').length > 0 ){
		if($(ele).hasClass('active')){
			active = true;
		} else {
			ele_other = $('#capabilities .left .topic.active');
		}
		if($('#capabilities .left .topic.active').length <= 0){
			ele_other = false;
		}

		if($(window).width() >= 1200){

			var class_name = '';
			class_name = $(ele).attr('class');
			class_name = class_name.replace(' topic','');
			class_name = class_name.replace(' active','');
			var pos_box = $('#capabilities .left').offset();
			var pos_topic = $(ele).offset();
			$('#capabilities .topic').removeClass('active');
			$('#capabilities .right .topic.'+class_name).addClass('active');
			var pos = pos_topic.top - pos_box.top - 4;
			if(pos <= 0){ pos = 0; }
			$('#capabilities .line').css({'height':pos+'px'});
			$(ele).addClass('active');

		} else {

			if(ele_other != false){

			$(ele_other).find('p').not('.topic-title').slideUp(300, function(){
				setTimeout(function(){
					$(ele_other).removeClass('active');
				},100);
				setTimeout(function(){
					if(!active){
						$(ele).addClass('active');
						$(ele).find('p').not('.topic-title').slideDown(300);
					}
				},100);
			});

			} else {

				$(ele).addClass('active');
				$(ele).find('p').not('.topic-title').slideDown(300);

			}

		}
  }
	}


  /* Search results --------------------------------------------------------------------------------------------------*/

  if ( $('#search-results').length > 0 ) {
    var ulSearch = $('ul.search');
    var lastResult = null;
    var splitURL;

    /* Detects every result that is added to the list */
    ulSearch.on('DOMSubtreeModified', function(){
      lastResult = $('ul.search li:last-child');
      splitURL = lastResult.children('a').prop('href').split('/');

      /* Checks the URL to mark the results found in excludedSearchFolders */
      $.each(excludedSearchFolders, function(index, value){
        if ( $.inArray(value, splitURL) !== -1 ) {
          lastResult.addClass('excluded-search-result'); /* Marks initially excluded result */
					lastResult.addClass('hidden-result'); /* Hides the excluded result */
          return false; // breaks the $.each loop
        }
      });
    });

    /* Replaces the result message */
    $('#search-results > p:first').one('DOMSubtreeModified', function(){
      var totalResults = $('ul.search li').length;
      var excludedResults = $('ul.search li.excluded-search-result').length;
      var resultText = '';
      if ( totalResults > 0 ){
        if ( excludedResults > 0 ) {
          resultText = 'Search finished. Found <span id="n-results">' + (totalResults-excludedResults) + '</span> page(s) matching the search query. <a id="toggle-results" class="include" href="#">Include Release Notes results</a>';
        } else {
          resultText = 'Search finished. Found <span id="n-results">' + totalResults + '</span> page(s) matching the search query.';
        }
        $(this).html(resultText);
      }
    });

    /* Click that allows showing excluded results */
    $(document).delegate('#search-results #toggle-results.include', 'click', function(){
			var toggleButton = $(this);
			var excludedResults = $('ul.search li.excluded-search-result');

      toggleButton.text(toggleButton.text().replace('Include', 'Exclude'));
      toggleButton.removeClass('include').addClass('exclude');
			$('#search-results #n-results').text($('ul.search li').length);

			excludedResults.each(function(e){
				currResult = $(this);
				currResult.hide(0, function(){
					$(this).removeClass('hidden-result');
				})
				currResult.show('fast');
			});
    });

    /* Click that allows hiding excluded results */
    $(document).delegate('#search-results #toggle-results.exclude', 'click', function(){
			var toggleButton = $(this);
			var excludedResults = $('ul.search li.excluded-search-result');

      toggleButton.text(toggleButton.text().replace('Exclude', 'Include'));
      toggleButton.removeClass('exclude').addClass('include');
			$('#search-results #n-results').text($('ul.search li').length - excludedResults.length);

			excludedResults.each(function(e){
				currResult = $(this);
				currResult.hide('fast', function(){
					$(this).addClass('hidden-result');
				});
			});
    });

  }

  /* Lightbox style fix */
  $('a[data-lightbox]').on('click', function(){
    var topheight = $('body').hasClass('scrolled') ? 101 : 152;
    var top_value = $('.side-scroll').offset().top;
    $('html, body').css('overflow', 'hidden');
    $('#lightboxOverlay').width('100%');
    $('.side-scroll').attr('style',$('.side-scroll').attr('style')+'position: relative; top: '+(top_value-topheight)+'px');
  });

  $('#lightboxOverlay, #lightbox, #lightbox .lb-close').on('click', function(e){
    $('html, body').css('overflow', '');
    $('.side-scroll').removeAttr('style');
    menuHeight();
  });

  $('#lightbox .lb-details span, #lightbox .lb-dataContainer :not(.lb-close)').on('click', function(e){
    e.stopPropagation();
    $('html, body').css('overflow', 'hidden');
  });

  /* Restore overflow when pressing key 'Esc' */
  $(document).on('keydown', function(e){
    if( e.keyCode == 27 ){
      $('html, body').css('overflow', '');
    }
  });
});