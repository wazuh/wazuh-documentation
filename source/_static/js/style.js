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

 });

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
	 });
});
