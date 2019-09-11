$(function() {
  let loc = location.hash;
  const spaceBeforeAnchor = 60;
  /* List of folders that will be excluded from search */
  const excludedSearchFolders = ['release-notes'];

  /* List of empty nodes, containing only a toctree */
  const emptyTocNodes = [
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
    'user-manual/index',
    'user-manual/agents/index',
    'user-manual/agents/remove-agents/index',
    'user-manual/agents/listing/index',
    'user-manual/kibana-app/reference/index',
    'user-manual/ruleset/ruleset-xml-syntax/index',
  ];

  /* list of nodes (by title) which will not show their subtree */
  const hideSubtreeNodes = [
    'Install Wazuh manager on Linux',
    'Install Wazuh agent on Linux',
  ].map(function(item) {
    return item.toLowerCase();
  });

  markTocNodesWithClass(emptyTocNodes, 'empty-toc-node');
  checkScroll();
  if (document.location.hash) {
    correctScrollTo(spaceBeforeAnchor);
  }

  /* Finds current page section in globaltoc */
  $('.globaltoc .toctree-l2.current a').each(function(e) {
    if (!$(this).siblings('ul').length) {
      $(this).addClass('leaf');
    }
  });

  /* Finds all nodes that contains subtrees within the globaltoc and appends a toggle button to them */
  $('.globaltoc .toctree-l1 a').each(function(e) {
    if ($(this).siblings('ul').length) {
      $(this).closest('li').addClass('toc-toggle');
      $(this).append($('<button class="toc-toggle-btn"><span class="toc-toggle-icon"></span></button>'));
    }
  });

  showCurrentSubtree();
  hideSubtree(hideSubtreeNodes);

  /* Show the hidden menu */
  setTimeout(function() {
    $('#navbar-globaltoc').removeClass('hidden');
  }, 500);

  $(window).on('hashchange', function() {
    updateFromHash();
    correctScrollTo(spaceBeforeAnchor);
  });

  /**
   * Updates the hash value (from the URL) in order to update the selected leaf from the globl toctree.
   * That is, when the sections within a document are included in the toctree.
   */
  function updateFromHash() {
    loc = location.hash;
    selectLeaf(loc);
  }

  /**
   * When sections of a document are included in the toctree, this updates the selected section in the global toctree.
   * @param {string} hash String that appearse after the sign # in the URL.
   */
  function selectLeaf(hash) {
    if (hash.length > 0) {
      $('.globaltoc [href="'+hash+'"]').addClass('current');
    } else {
      $('.globaltoc [href="#"]').addClass('current');
    }
  }

  /* Turn all tables in responsive table */
  reponsiveTables();

  /**
   * Adds the class table-responsive to tables in #main-content wider than their container.
   */
  function reponsiveTables() {
    $('#main-content table').each(function() {
      if ( $(this).width() > $('main').width()) {
        $(this).addClass('table-responsive');
      }
    });
  }

  /* Page scroll event -------------------------------------------------------*/
  $('#btn-scroll').on('click', function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
    return false;
  });

  $(window).on('scroll', function(e) {
    const scrollYTopPosition = e.currentTarget.pageYOffset;

    /* Back to top button */
    if ( scrollYTopPosition >= $(window).height()*.50 ) {
      $('#btn-scroll').fadeIn('slow');
    } else {
      $('#btn-scroll').fadeOut('slow');
    }

    checkScroll();
  });

  /**
   * Checks the document scroll and add/remove the "scrolled" class
   */
  function checkScroll() {
    const scrollTop = $(document).scrollTop();
    let headerHeight = 100;
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

  const navbarTop = 100;
  let noticeHeight = 0;
  if ($('#page').hasClass('no-latest-docs')) {
    noticeHeight = parseInt($('.no-latest-notice').outerHeight());
  }

  let delay = navbarTop + 200;
  let windowHeight = window.innerHeight;
  let documentHeight = $(document).outerHeight();
  let documentScroll = $(window).scrollTop();
  let containerNavHeight = parseInt($('#navbar-globaltoc').outerHeight());
  let navHeight = parseInt($('#globaltoc').outerHeight());
  let pageFocus = 'document';
  let pageHover = 'document';
  let pageMouseWheel = false;
  let navbarClick = false;

  heightNavbar();
  scrollNavbar();
  headerSticky();

  $('#navbar').on('mousemove', function(e) {
    pageHover = 'nav';
  });

  $('#header, #main-content').on('mousemove', function(e) {
    pageHover = 'document';
  });

  $(window).bind('mousewheel DOMMouseScroll', function(e) {
    pageMouseWheel = true;
  });

  $(document).keydown(function(e) {
    if (e.which == 38 || e.which == 40) {
      pageMouseWheel = false;
    }
  });

  $('#navbar a').focus(function() {
    navbarClick = true;
  });

  $('#header, #main-content').click(function() {
    navbarClick = false;
  });

  $(window).on('resize', function(e) {
    windowHeight = window.innerHeight;
    documentHeight = $(document).outerHeight();
    documentScroll = $(window).scrollTop();
    containerNavHeight = parseInt($('#navbar-globaltoc').outerHeight());
    navHeight = parseInt($('#globaltoc').outerHeight());
    if ($('#page').hasClass('no-latest-docs')) {
      noticeHeight = parseInt($('.no-latest-notice').outerHeight());
    }

    if ($(window).outerWidth() >= 992) {
      $('html').css({'overflow-y': 'auto'});
    }

    heightNavbar();
    scrollNavbar();
  });

  $('#navbar-globaltoc').on('scroll', function(e) {
    pageFocus = 'nav';
  });

  $(window).on('scroll', function(e) {
    pageFocus = 'document';

    windowHeight = window.innerHeight;
    documentHeight = $(document).outerHeight();
    documentScroll = $(window).scrollTop();
    containerNavHeight = parseInt($('#navbar-globaltoc').outerHeight());
    navHeight = parseInt($('#globaltoc').outerHeight());
    /* Update height of navbar */
    heightNavbar();
    /* If the coursor isn't in the navbar */
    if (((pageFocus == 'document' && pageHover == 'document') ||
      (pageMouseWheel && pageFocus == 'nav' && pageHover == 'nav') ||
      (!navbarClick && !pageMouseWheel && pageFocus == 'document' && pageHover == 'nav')
    ) && $(window).outerWidth() >= 992) {
      /* Set the new scroll of navbar */
      scrollNavbar();
    }

    headerSticky();
  });

  $('.navbar-toggler').on('click', function(e) {
    if ($(this).hasClass('collapsed')) {
      $('html').css({'overflow-y': 'hidden'});
    } else {
      $('html').css({'overflow-y': 'auto'});
    }
  });

  /**
   * Changes the navbar (globaltoc) height
   */
  function heightNavbar() {
    if ($(window).outerWidth() >= 992) {
      if (documentScroll <= navbarTop) {
        $('#navbar').css({'padding-top': (noticeHeight+navbarTop-documentScroll)+'px'});
        $('#navbar-globaltoc').css({'height': 'calc(100vh - 152px - '+ noticeHeight +'px + '+documentScroll+'px)'});
      } else {
        $('#navbar').css({'padding-top': noticeHeight});
        $('#navbar-globaltoc').css({'height': 'calc(100vh - 152px - '+ noticeHeight +'px + '+navbarTop+'px)'});
      }
      $('#navbar-globaltoc').css({'padding-top': 0});
    } else {
      if (documentScroll <= navbarTop) {
        $('#navbar').css({'padding-top': 0});
        $('#navbar-globaltoc').css({'padding-top': (noticeHeight+100)+'px'});
      } else {
        $('#navbar').css({'padding-top': 0});
        $('#navbar-globaltoc').css({'padding-top': (noticeHeight+52)+'px'});
      }
    }
  }

  /**
   * Sets the same scroll on the navbar (globaltoc) that on the document
   */
  function scrollNavbar() {
    scrollReal = documentHeight-windowHeight-delay;
    if (scrollReal < 0) {
      scrollReal += delay;
      delay = 0;
    }
    navScrollReal = navHeight-containerNavHeight;
    percentage = ((documentScroll-delay)/scrollReal).toFixed(3);
    navScrollEnd = (percentage*navScrollReal).toFixed();
    if (percentage == 0) {
      navScrollEnd = 0;
    }
    if (percentage == 1) {
      navScrollEnd += 20;
    }

    if (navScrollReal >= 0) {
      $('#navbar-globaltoc').scrollTop(navScrollEnd);
    }
  }

  /**
   * Changes the "top" value of sticky header
   */
  function headerSticky() {
    const documentScroll = $(window).scrollTop();
    if (documentScroll >= (noticeHeight+100)) {
      $('#header-sticky').css({'top': noticeHeight});
    } else {
      $('#header-sticky').css({'top': '-52px'});
    }
  }

  /* Toggle collapse */
  $('.globaltoc a .toc-toggle-btn').on('click', function(e) {
    /* Normal link: avoid toggle if current menu item doesn't have submenu */
    li = $(e.target).closest('li');
    if (!li || li.children('ul').length == 0 ) {
      return true;
    }

    e.stopPropagation();
    e.preventDefault();

    if ( li.hasClass('show')) {
      li.removeClass('show');
    } else {
      li.siblings('li').removeClass('show');
      li.addClass('show');
    }

    if (!li.parents().hasClass('show')) {
      $('.globaltoc li.show').addClass('show');
    }

    $('.globaltoc li.initial').removeClass('initial');
    completelyHideMenuItems();
    return false;
  });

  /**
   * Shows the selected style for the parent document of pages that don't appear in the globaltoc
   * @return {boolean} Returns true only if this funcionability in not applicable to the current page.
   */
  function showCurrentSubtree() {
    updateFromHash();
    if ($('ul li.toctree-l1 a.current.reference.internal, ul li.toctree-l1 .current > .leaf').length == 0 && !$('#page').hasClass('index') && !$('#page').hasClass('not-indexed') ) {
      $('.globaltoc :contains("'+ $('#breadcrumbs li:nth-last-child(2) a').text() +'")').addClass('show').addClass('current');
      return true;
    }
    let currentLeaf = $('.globaltoc a.current.leaf');
    if (currentLeaf.length == 0) {
      currentLeaf = $('.globaltoc [href="#"].current');
    }
    currentLeaf.parents('li').each(function() {
      $(this).addClass('initial').addClass('show');
    });
    $('#navbar-globaltoc').removeClass('hidden');
    completelyHideMenuItems();
  }

  /**
   * Completely hides the visually hidden elements
   */
  function completelyHideMenuItems() {
    $('#navbar-globaltoc li ul').each(function() {
      if ( $(this).closest('li').hasClass('show') ) {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    });
  }

  /**
   * Gives the class stored in className to all nodes from nodeList that are present in the toctree.
   * Function mainly used to mark the empty nodes (documents that contain only a toctree, without real content).
   * Note: this might be improved in the future using a new builder or extension.
   * @param {array} nodeList List of nodes in the toctree that needs to be marked with the class.
   * @param {string} className Class to be applied to the nodes.
   */
  function markTocNodesWithClass(nodeList, className) {
    let regex;
    const curLocation = location.href.split('#')[0];
    nodeList.forEach(function(tocNode) {
      emptyNode = '.+\/' + tocNode + '.html';
      regex = new RegExp( emptyNode, 'g');
      $('.globaltoc a').each(function() {
        const href = $(this).prop('href').split('#')[0];
        const isCurrent = (href === curLocation);
        /* The selected menu link in the globaltoc acts as the toggle button, showing on and off its subtree */
        if ( regex.test(href) || isCurrent ) {
          $(this).addClass(className);
        }
        if ( isCurrent ) {
          $(this).addClass('current-toc-node');
        }
      });
    });
  }

  /**
   * Hides from the global toctree the subtree of particular nodes specified in a list.
   * @param {array} nodeList List of nodes whose subtree should not be shown in the global toctree.
   */
  function hideSubtree(nodeList) {
    $('#globaltoc a').each(function() {
      if ( jQuery.inArray( $(this).text().toLowerCase(), nodeList ) !== -1 ) {
        $(this).siblings().hide();
        $(this).children('button').hide();
      }
    });
  }

  $('.globaltoc .empty-toc-node').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();
      $(this).find('.toc-toggle-btn').click();
    });
  });

  /* Scrolls up when clicking current toctree node */
  $('.globaltoc .current-toc-node').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, '500');
    });
  });

  /* Resize event --------------------------------------------------------------------------------------------------*/
  $(window).on('resize', function(e) {
    $('table').removeClass('table-responsive');
    reponsiveTables();
    checkScroll();
  });

  /**
   * Corrects the scrolling movement so the element to which the page is being scrolled appears correctly in the screen,
   * having in mind the fixed top bar and the no-latest-notice if present.
   * @param {int} spaceBeforeAnchor Space required between the target element and the top of the window.
   */
  function correctScrollTo(spaceBeforeAnchor) {
    if ( $('#page').hasClass('no-latest-docs') ) {
      spaceBeforeAnchor = spaceBeforeAnchor + 40;
    }
    setTimeout(function() {
      window.scrollTo(window.scrollX, window.scrollY - spaceBeforeAnchor);
    }, 10);
  }

  /* -- Add funcionability for cloud-info --------------------------------------------------------------------------- */

  if ($(window).outerWidth() < 1200) {
    $('#capabilities .left .topic.active p').not('.topic-title').slideDown(300);
  }

  $(window).resize(function() {
    if ($(window).outerWidth() >= 1200) {
      $('#capabilities .left .topic p').not('.topic-title').css({'display': 'none'});
      if ($('#capabilities .left .topic.active').length > 0) {
        capabilitiesHome($('#capabilities .left .topic.active'));
      } else {
        capabilitiesHome($('#capabilities .left .topic').first());
      }
    } else {
      $('#capabilities .left .topic.active p').not('.topic-title').css({'display': 'block'});
    }
  });

  $('#capabilities .left .topic').click(function() {
    capabilitiesHome(this);
  });


  /**
   * Only for main index (documentation's home page).
   * Functionallity of the capabilities section: selects capability, controls the responsive behaviour, etc.
   * @param {DOMObject} ele Element containing the capability currently selected (active) or clicked.
   */
  function capabilitiesHome(ele) {
    let eleOther = ele;
    let active = false;

    if ( $('#page.index').length > 0 ) {
      if ($(ele).hasClass('active')) {
        active = true;
      } else {
        eleOther = $('#capabilities .left .topic.active');
      }
      if ($('#capabilities .left .topic.active').length <= 0) {
        eleOther = false;
      }

      if ($(window).outerWidth() >= 1200) {
        let className = '';
        className = $(ele).attr('class');
        className = className.replace(' topic', '');
        className = className.replace(' active', '');
        const posBox = $('#capabilities .left').offset();
        const posTopic = $(ele).offset();
        $('#capabilities .topic').removeClass('active');
        $('#capabilities .right .topic.'+className).addClass('active');
        let pos = posTopic.top - posBox.top - 4;
        if (pos <= 0) {
          pos = 0;
        }
        $('#capabilities .line').css({'height': pos+'px'});
        $(ele).addClass('active');
      } else {
        if (eleOther != false) {
          $(eleOther).find('p').not('.topic-title').slideUp(300, function() {
            setTimeout(function() {
              $(eleOther).removeClass('active');
            }, 100);
            setTimeout(function() {
              if (!active) {
                $(ele).addClass('active');
                $(ele).find('p').not('.topic-title').slideDown(300);
              }
            }, 100);
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
    const ulSearch = $('ul.search');
    let lastResult = null;
    let splitURL;

    /* Detects every result that is added to the list */
    ulSearch.on('DOMSubtreeModified', function() {
      lastResult = $('ul.search li:last-child');
      splitURL = lastResult.children('a').prop('href').split('/');

      /* Checks the URL to mark the results found in excludedSearchFolders */
      $.each(excludedSearchFolders, function(index, value) {
        if ( $.inArray(value, splitURL) !== -1 ) {
          lastResult.addClass('excluded-search-result'); /* Marks initially excluded result */
          lastResult.addClass('hidden-result'); /* Hides the excluded result */
          return false; /* breaks the $.each loop */
        }
      });
    });

    /* Replaces the result message */
    $('#search-results > p:first').one('DOMSubtreeModified', function() {
      const totalResults = $('ul.search li').length;
      const excludedResults = $('ul.search li.excluded-search-result').length;
      let resultText = '';
      if ( totalResults > 0 ) {
        if ( excludedResults > 0 ) {
          resultText = 'Search finished. Found <span id="n-results">' + (totalResults-excludedResults) + '</span> page(s) matching the search query. <a id="toggle-results" class="include" href="#">Include Release Notes results</a>';
        } else {
          resultText = 'Search finished. Found <span id="n-results">' + totalResults + '</span> page(s) matching the search query.';
        }
        $(this).html(resultText);
      }
    });

    /* Click that allows showing excluded results */
    $(document).delegate('#search-results #toggle-results.include', 'click', function() {
      const toggleButton = $(this);
      const excludedResults = $('ul.search li.excluded-search-result');

      toggleButton.text(toggleButton.text().replace('Include', 'Exclude'));
      toggleButton.removeClass('include').addClass('exclude');
      $('#search-results #n-results').text($('ul.search li').length);

      excludedResults.each(function(e) {
        currResult = $(this);
        currResult.hide(0, function() {
          $(this).removeClass('hidden-result');
        });
        currResult.show('fast');
      });
    });

    /* Click that allows hiding excluded results */
    $(document).delegate('#search-results #toggle-results.exclude', 'click', function() {
      const toggleButton = $(this);
      const excludedResults = $('ul.search li.excluded-search-result');

      toggleButton.text(toggleButton.text().replace('Exclude', 'Include'));
      toggleButton.removeClass('exclude').addClass('include');
      $('#search-results #n-results').text($('ul.search li').length - excludedResults.length);

      excludedResults.each(function(e) {
        currResult = $(this);
        currResult.hide('fast', function() {
          $(this).addClass('hidden-result');
        });
      });
    });
  }

  /* Lightbox style fix */
  $('a[data-lightbox]').on('click', function() {
    const topheight = $('body').hasClass('scrolled') ? 101 : 152;
    const topValue = $('.side-scroll').offset().top;
    $('html, body').css('overflow', 'hidden');
    $('#lightboxOverlay').width('100%');
    $('.side-scroll').attr('style', $('.side-scroll').attr('style')+'position: relative; top: '+(topValue-topheight)+'px');
  });

  $('#lightboxOverlay, #lightbox, #lightbox .lb-close').on('click', function(e) {
    $('html, body').css('overflow', '');
    $('.side-scroll').removeAttr('style');
    menuHeight();
  });

  $('#lightbox .lb-details span, #lightbox .lb-dataContainer :not(.lb-close)').on('click', function(e) {
    e.stopPropagation();
    $('html, body').css('overflow', 'hidden');
  });

  /* Restore overflow when pressing key 'Esc' */
  $(document).on('keydown', function(e) {
    if ( e.keyCode == 27 ) {
      $('html, body').css('overflow', '');
    }
  });
});
