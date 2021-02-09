$(function() {
  const version = '' + $('[data-version]').data('version');
  const minVersionScreenshot = '3.13';
  const minVersionRedoc = '4.0';
  const simultaneousCapaSlide = (compareVersion(version, minVersionScreenshot) >= 0);
  const useApiRedoc = (compareVersion(version, minVersionRedoc) >= 0);
  const spaceBeforeAnchor = 60;
  /* List of folders that will be excluded from search */
  const excludedSearchFolders = ['release-notes'];
  const intervalTime = 5000;
  let capaInterval = null;

  if ( useApiRedoc ) {
    /* Change DOMAIN in href */
    const domainReplacePattern = 'https://DOMAIN';
    const urlRoot = DOCUMENTATION_OPTIONS.VERSION;
    $('[href^="'+domainReplacePattern+'/"]').each(function() {
      const oldHref = $(this).attr('href');
      $(this).attr('href', oldHref.replace(domainReplacePattern+'/', urlRoot));
      $(this).attr('target', '_blank');
    });
  }

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

  /* List of nodes in the toctree that should be open in a new tab */
  const newTabNodes = [
    'user-manual/api/reference',
  ];
  if ( useApiRedoc ) {
    markTocNodesWithClass(newTabNodes, 'js-new-tab');
    $('.js-new-tab').attr('target', '_blank');

    /* Links to new tab found within the main content */
    $('#main-content .reference.internal').each(function() {
      const linkRef = this;
      newTabNodes.forEach(function(item) {
        if (linkRef.href.indexOf(item) !== -1) {
          $(linkRef).attr('target', '_blank');
          return;
        }
      });
    });
  }

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

  /* Finds all nodes that contains subtrees within the globaltoc and appends a toggle button to them */
  $('.globaltoc .toctree-l1 a').each(function(e) {
    if ($(this).siblings('ul').length) {
      $(this).closest('li').addClass('toc-toggle');
      $(this).append($('<button class="toc-toggle-btn"><span class="toc-toggle-icon"></span></button>'));
    }
  });

  hideSubtree(hideSubtreeNodes);

  $(window).on('hashchange', function() {
    correctScrollTo(spaceBeforeAnchor);
  });

  /* Turn all tables in responsive table */
  reponsiveTables();

  /**
   * Adds the class table-responsive to tables in #main-content wider than their container.
   */
  function reponsiveTables() {
    $('#main-content table').each(function() {
      if ($(this).width() > $('main').width()) {
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
    if (scrollYTopPosition >= $(window).height() * .50) {
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
    if (scrollTop >= headerHeight) {
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
  let documentScroll = $(window).scrollTop();
  let disableScroll = false;
  let scrollDirection = 'down';
  let hoverDocument = 'document';
  let eventScroll;

  heightNavbar();
  headerSticky();

  setTimeout(function() {
    if ($('#page').hasClass('no-latest-docs')) {
      noticeHeight = parseInt($('.no-latest-notice').outerHeight());
    }
  }, 500);

  $('#header, #main-content').on('mouseenter', function() {
    hoverDocument = 'document';
  });

  $('#navbar-globaltoc').on('mouseenter', function() {
    hoverDocument = 'navbar';
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
    adjustLightboxHeight();
  });

  const mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'wheel';

  if (document.getElementById('navbar-globaltoc').addEventListener) {
    document.getElementById('navbar-globaltoc').addEventListener(mousewheelevt, function(e) {
      eventScroll = 'mousewheel';
      const delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1;
      if (delta < 0) {
        scrollDirection = 'up';
      } else if (delta > 0) {
        scrollDirection = 'down';
      }
      enableDisableScroll();
      if (disableScroll) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, {passive: false});
  }

  $('#navbar-globaltoc').keydown(function(e) {
    eventScroll = 'keys';
    let arrowKeys = false;
    if (e.which == 38) {
      arrowKeys = true;
      scrollDirection = 'up';
    }
    if (e.which == 40) {
      arrowKeys = true;
      scrollDirection = 'down';
    }
    enableDisableScroll();
    if (arrowKeys) {
      if (disableScroll) {
        return false;
      }
    }
  });

  $(document).keydown(function(e) {
    if (
      (e.which == 38 || e.which == 40) &&
      hoverDocument == 'navbar'
    ) {
      eventScroll = 'keys';
      let arrowKeys = false;
      if (e.which == 38) {
        arrowKeys = true;
        scrollDirection = 'up';
      }
      if (e.which == 40) {
        arrowKeys = true;
        scrollDirection = 'down';
      }
      enableDisableScroll();
      if (arrowKeys) {
        if (disableScroll) {
          return false;
        }
      }
    }
  });

  /**
   * Enable or disable the scroll of #navbar-globaltoc
   */
  function enableDisableScroll() {
    const ele = document.getElementById('navbar-globaltoc');
    navbarHeight = parseInt(ele.scrollHeight) - parseInt($(ele).outerHeight());
    navbarScroll = $(ele).scrollTop();
    if (navbarScroll == navbarHeight && scrollDirection == 'down' && eventScroll == 'mousewheel') {
      disableScroll = true;
    } else if (navbarScroll == 0 && scrollDirection == 'up' && eventScroll == 'mousewheel') {
      disableScroll = true;
    } else if (navbarScroll == navbarHeight && scrollDirection == 'down' && eventScroll == 'keys' && hoverDocument == 'navbar') {
      disableScroll = true;
    } else if (navbarScroll == 0 && scrollDirection == 'up' && eventScroll == 'keys' && hoverDocument == 'navbar') {
      disableScroll = true;
    } else {
      disableScroll = false;
    }
  }

  $(window).on('scroll', function(e) {
    windowHeight = window.innerHeight;
    documentHeight = $(document).outerHeight();
    documentScroll = $(window).scrollTop();
    containerNavHeight = parseInt($('#navbar-globaltoc').outerHeight());
    navHeight = parseInt($('#globaltoc').outerHeight());
    /* Update height of navbar */
    heightNavbar();
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
    if ($(window).width() >= 992) {
      if (documentScroll <= navbarTop) {
        $('#navbar').css({'padding-top': (noticeHeight + navbarTop - documentScroll) + 'px'});
        $('#navbar-globaltoc').css({'height': 'calc(100vh - 152px - ' + noticeHeight + 'px + ' + documentScroll + 'px)'});
      } else {
        $('#navbar').css({'padding-top': noticeHeight});
        $('#navbar-globaltoc').css({'height': 'calc(100vh - 152px - ' + noticeHeight + 'px + ' + navbarTop + 'px)'});
      }
      $('#navbar-globaltoc').css({'padding-top': 0});
    } else {
      if (documentScroll <= navbarTop) {
        $('#navbar').css({'padding-top': 0});
        $('#navbar-globaltoc').css({'padding-top': (noticeHeight + 100) + 'px'});
      } else {
        $('#navbar').css({'padding-top': 0});
        $('#navbar-globaltoc').css({'padding-top': (noticeHeight + 52) + 'px'});
      }
    }
  }

  /**
   * Changes the "top" value of sticky header
   */
  function headerSticky() {
    const documentScroll = $(window).scrollTop();
    if (documentScroll >= (noticeHeight + 100)) {
      $('#header-sticky').css({'top': noticeHeight});
    } else {
      $('#header-sticky').css({'top': '-52px'});
    }
  }

  /* Toggle collapse */
  $('.globaltoc a .toc-toggle-btn').on('click', function(e) {
    /* Normal link: avoid toggle if current menu item doesn't have submenu */
    li = $(e.target).closest('li');
    if (!li || li.children('ul').length == 0) {
      return true;
    }

    e.stopPropagation();
    e.preventDefault();

    if (li.hasClass('show')) {
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
   * Completely hides the visually hidden elements
   */
  function completelyHideMenuItems() {
    $('#navbar-globaltoc li ul').each(function() {
      if ($(this).closest('li').hasClass('show')) {
        this.hidden = false;
        $(this).slideDown(300);
      } else {
        $(this).slideUp(300, function() {
          this.hidden = true;
        });
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
      regex = new RegExp(emptyNode, 'g');
      $('.globaltoc a').each(function() {
        const href = $(this).prop('href').split('#')[0];
        const isCurrent = (href === curLocation);
        /* The selected menu link in the globaltoc acts as the toggle button, showing on and off its subtree */
        if (regex.test(href) || isCurrent) {
          $(this).addClass(className);
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
      if (jQuery.inArray($(this).text().toLowerCase(), nodeList) !== -1) {
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
    if ($('#page').hasClass('no-latest-docs')) {
      spaceBeforeAnchor = spaceBeforeAnchor + 40;
    }
    setTimeout(function() {
      window.scrollTo(window.scrollX, window.scrollY - spaceBeforeAnchor);
    }, 10);
  }

  /* -- Add functionality for the capabilities in the home page --------------------------------------------- */

  if ($(window).outerWidth() < 1200) {
    $('#capabilities .left .topic.active p').not('.topic-title').slideDown(300);
  }

  $(window).resize(function() {
    clearInterval(capaInterval);
    if ($(window).outerWidth() >= 1200) {
      if (simultaneousCapaSlide) {
        initCapabilities();
      }
      $('#capabilities .left .topic p').not('.topic-title').css({'display': 'none'});
      if ($('#capabilities .left .topic.active').length > 0) {
        capabilitiesHome($('#capabilities .left .topic.active'));
      } else {
        capabilitiesHome($('#capabilities .left .topic').first());
      }
    } else {
      if (simultaneousCapaSlide) {
        stopCapabilities();
      }
      $('#capabilities .left .topic.active p').not('.topic-title').css({'display': 'block'});
    }
  });

  $('#capabilities .left .topic').click(function() {
    capabilitiesHome(this, simultaneousCapaSlide);
  });

  if ($(window).outerWidth() >= 1200 && simultaneousCapaSlide ) {
    initCapabilities();
  }

  if ( simultaneousCapaSlide ) {
    $('.screenshots .carousel').carousel({
      interval: intervalTime,
    });

    $('.capab .topic, .screenshots .carousel').on('click', function() {
      $('.carousel').carousel('pause');
      clearInterval(capaInterval);
    });
  }

  /**
   * Initialices part of the functionality of the capability selection in the home page
   */
  function initCapabilities() {
    capaInterval = setInterval(function() {
      changeCapabilityNext(true);
    }, intervalTime);

    $('.screenshots .carousel .carousel-control-prev, .screenshots .carousel .carousel-control-next').click(function() {
      /* Update the selected capability to the correct one only when the slide animation has started */
      $('.screenshots .carousel').one('slide.bs.carousel', function(carousel) {
        changeCapabilityTo(carousel.to, false);
      });
    });
  }

  /**
   * Stops part of the functionality of the capability selection in the home page
   */
  function stopCapabilities() {
    $('.screenshots .carousel .carousel-control-prev, .screenshots .carousel .carousel-control-next').off();
  }

  /**
   * Given an index (capaindex), change the active capability.
   * @param {int} capaindex Index of the capability to be selected
   * @param {boolean} auto Indicates whether the carousel slide must be automatically updated (true) or not (false)
   */
  function changeCapabilityTo(capaindex, auto) {
    const topics = $('#capabilities .left .topic');
    capabilitiesHome(topics.eq(capaindex), auto);
  }

  /**
   * Change the active capability to the next one.
   * @param {boolean} auto Indicates whether the carousel slide must be automatically updated (true) or not (false)
   */
  function changeCapabilityNext(auto) {
    const topics = $('#capabilities .left .topic');
    const active = $('#capabilities .left .topic.active');
    let capaindex = topics.index(active);
    capaindex = (capaindex+1) % topics.length;
    capabilitiesHome(topics.eq(capaindex), auto);
  }

  /**
   * Only for main index (documentation's home page).
   * Functionality of the capabilities section: selects capability, controls the responsive behavior, etc.
   * @param {DOMObject} ele Element containing the capability currently selected (active) or clicked.
   * @param {boolean} auto Indicates whether the carousel slide must be automatically updated (true) or not (false)
   */
  function capabilitiesHome(ele, auto) {
    let eleOther = ele;
    let active = false;
    const item = $('#capabilities .left .topic').index(ele);

    if ($('#page.index').length > 0) {
      if ($(ele).hasClass('active')) {
        active = true;
      } else {
        eleOther = $('#capabilities .left .topic.active');
      }
      if ($('#capabilities .left .topic.active').length <= 0) {
        eleOther = false;
      }

      /* Update slider */
      if ( auto ) {
        $('.screenshots .carousel').carousel(item);
      }

      if ($(window).outerWidth() >= 1200) {
        let className = '';
        className = $(ele).attr('class');
        className = className.replace(' topic', '');
        className = className.replace(' active', '');
        const posBox = $('#capabilities .left').offset();
        const posTopic = $(ele).offset();
        $('#capabilities .topic').removeClass('active');
        $('#capabilities .right .topic.' + className).addClass('active');
        let pos = posTopic.top - posBox.top - 4;
        if (pos <= 0) {
          pos = 0;
        }
        $('#capabilities .line').css({'height': pos + 'px'});
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

  const searchResults = $('#search-results');

  if (searchResults.length > 0) {
    let lastResult = null;
    let splitURL = null;
    const configAdd = {childList: true};
    let observerResults = null;
    let observerResultList = null;
    let observerResultText = null;
    let i = 0;

    /* Detects every result that is added to the list */
    const addedResult = function(mutationsList, observer) {
      for (i = 0; i < mutationsList.length; i++) {
        if (mutationsList[i].type === 'childList') {
          lastResult = $('ul.search li:last-child');
          splitURL = lastResult.children('a').prop('href').split('/');
          /* Checks the URL to mark the results found in excludedSearchFolders */
          $.each(excludedSearchFolders, function(index, value) {
            if ($.inArray(value, splitURL) !== -1) {
              lastResult.addClass('excluded-search-result'); /* Marks initially excluded result */
              lastResult.addClass('hidden-result'); /* Hides the excluded result */
              return false; /* breaks the $.each loop */
            }
          });
        }
      }
    };

    /* Checking that the list of search results exists */
    const existsResultList = function(mutationsList, observer) {
      for (i = 0; i < mutationsList.length; i++) {
        if (mutationsList[i].type === 'childList' && $(mutationsList[i].addedNodes[0]).hasClass('search')) {
          const ulSearch = $('ul.search');

          observerResults.disconnect();

          observerResultList = new MutationObserver(addedResult);
          observerResultList.observe(ulSearch[0], configAdd);
          observerResultText = new MutationObserver(changeResultText);
          observerResultText.observe($('#search-results > p')[0], configAdd);
        }
      }
    };

    /* Replaces the result message */
    const changeResultText = function(mutationsList, observer) {
      for (i = 0; i < mutationsList.length; i++) {
        if (mutationsList[i].type === 'childList') {
          observerResultText.disconnect();
          const totalResults = $('ul.search li').length;
          const excludedResults = $('ul.search li.excluded-search-result').length;
          let resultText = '';
          if (totalResults > 0) {
            if (excludedResults > 0) {
              resultText = 'Search finished. Found <span id="n-results">' + (totalResults - excludedResults) + '</span> page(s) matching the search query. <a id="toggle-results" class="include" href="#">Include Release Notes results</a>';
            } else {
              resultText = 'Search finished. Found <span id="n-results">' + totalResults + '</span> page(s) matching the search query.';
            }
            $('#search-results > p:first').html(resultText);
          }
        }
      }
    };

    observerResults = new MutationObserver(existsResultList);
    observerResults.observe(searchResults[0], configAdd);


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
    $('.side-scroll').attr('style', $('.side-scroll').attr('style') + 'position: relative; top: ' + (topValue - topheight) + 'px');
  });

  $('#lightboxOverlay, #lightbox, #lightbox .lb-close').on('click', function(e) {
    $('html, body').css('overflow', '');
    $('.side-scroll').removeAttr('style');
  });

  $('#lightbox .lb-details span, #lightbox .lb-dataContainer :not(.lb-close)').on('click', function(e) {
    e.stopPropagation();
    $('html, body').css('overflow', 'hidden');
  });
  adjustLightboxHeight();

  /**
   * Checks the real height of .no-latest-notice in order to add the appropriate top margin to the lightbox element.
   * If .no-latest-notice is not visible, the margin is zero
   */
  function adjustLightboxHeight() {
    const noLatestElement = $('.no-latest-notice');
    if ( noLatestElement.length > 0) {
      const noLatestHeight = noLatestElement[0].offsetHeight;
      $('#lightbox').css('margin-top', noLatestHeight);
    }
  }

  /* Restore overflow when pressing key 'Esc' */
  $(document).on('keydown', function(e) {
    if (e.keyCode == 27) {
      $('html, body').css('overflow', '');
    }
  });

  /* Special code blocks --------------------------------------------------------------------------------*/
  $('.highlight').each(function() {
    const blockCode = $(this).parent();

    /* Output */
    if (!blockCode.hasClass('output')) {
      blockCode.prepend('<button type="button" class="copy-to-clipboard" title="Copy to clipboard"><span>Copied to clipboard</span><i class="far fa-copy" aria-hidden="true"></i></button>');
    } else {
      blockCode.prepend('<div class="admonition admonition-output"><p class="first admonition-title">Output</p></div>');
    }

    /* Escaped tag signs */
    if (blockCode.hasClass('escaped-tag-signs')) {
      let data = $(this).html();
      const datafragments = data.split(/\\</);
      data = '';
      datafragments.forEach(function(ltFragment, i) {
        /* The first fragment occurs just before the opening tag, so it doesn't need to be processed */
        if (i != 0) {
          gtFragments = ltFragment.split(/&gt;/);
          ltFragment = gtFragments.shift();
          if (gtFragments.length) {
            ltFragment += '\\>' + gtFragments.join('>');
          }
        }
        if (i != datafragments.length - 1) {
          data += ltFragment + '\\<';
        } else {
          data += ltFragment;
        }
      });
      $(this).html(data);
    }
  });

  /* Copy to clipboard ----------------------------------------------------------------------------------*/
  $('.copy-to-clipboard').click(function() {
    const ele = $(this);
    let data = $(ele).parent().find('.highlight');
    data = filterCodeBlock(data, $(ele).parent());
    copyToClipboard(data);
    $(ele).addClass('copied');
    $(ele).find('i').css({'display': 'none'}).find('span').css({'display': 'block'});
    $(ele).find('span').css({'display': 'block'});
    setTimeout(function() {
      $(ele).removeClass('copied');
    }, 700);
    setTimeout(function() {
      $(ele).find('span').css({'display': 'none'});
      $(ele).find('i').css({'display': 'block'});
      $(ele).focus();
    }, 1000);
  });

  /**
   * Filter the code block text that will be copied to the clipboard
   * @param {string} code The string from the code block
   * @param {Obj} parent jQuery object containing the parent element, which has the appropriate lexer class
   * @return {string} filter code block text
   */
  function filterCodeBlock(code, parent) {
    let data = code.text();
    const heredocs = findHeredocs(code);
    data = String(data);
    if ( !parent.hasClass('highlight-none') ) {
      /* Remove elipsis */
      data = data.replace(/(^|\n)\s*(\.\s{0,1}){3}\s*($|\n)/g, '\n');
      /* Remove prompts with square brakets */
      data = data.replace(/(.+]\$\s)/g, '');
      data = data.replace(/(.+]\#\s)/g, '');
      /* Remove especific prompts */
      data = data.replace(/ansible@ansible:.+\$\s/g, '');
      data = data.replace(/mysql>\s/g, '');
      data = data.replace(/sqlite>\s/g, '');
      data = data.replace(/Query\s.+\)\n/g, '');
      /* Remove prompts with format user@domain in general */
      data = data.replace(/.+@.+:.+(\#|\$)\s/g, '');
      /* Remove prompts with the symbol > */
      data = data.replace(/^>\s/g, '');
      data = data.replace(/\n>\s/g, '\n');
      /* Remove prompts with the symbol $ */
      data = data.replace(/(?:\$\s)/g, '');
      /* Remove additional line breaks */
      data = data.replace(/\n{2,}$/g, '\n');
      /* Remove prompts with the symbol # only when they cannot be considered comments */
      if (!parent.hasClass('highlight-yaml')
        && !parent.hasClass('highlight-python')
        && !parent.hasClass('highlight-perl')
        && !parent.hasClass('highlight-powershell')
        && !parent.is($('[class*="conf"]'))) {
        const isBash = parent.hasClass('highlight-bash');
        const isConsole = parent.hasClass('highlight-console');
        if (/<<[^<]/.test(data)) {
          data = replacePromptOnHeredoc(data, heredocs, isConsole, isBash);
        } else {
          data = filterPrompt(data, isConsole, isBash);
        }
      }
    }
    data = data.trim();
    return data;
  }

  /**
   * Copy the data to clipboard
   * @param {string} data The string to copy
   */
  function copyToClipboard(data) {
    const aux = document.createElement('textarea');
    aux.value = data;
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
  }

  /* Avoid select $ and # on the code blocks -----------------------------------------------------*/
  $('.highlight').each(function() {
    const ele = $(this);
    const data = ele.html();
    if (!ele.parent().hasClass('highlight-none')) {
      const heredocs = findHeredocs(data);
      const find = data.match(/(?:\$\s|\#)/g);
      if (find != null) {
        const dataArray = data.split('\n');
        const content = [];
        dataArray.forEach(function(line, i) {
          const heredocstart = heredocs.find( ({start}) => start === i );
          const heredocfinish = heredocs.find( ({finish}) => finish === i );
          const heredoc = heredocs.find( ({start, finish}) => start < i && finish > i );
          if ( heredocstart ) {
            line = '<span class="heredoc">'+line;
          } else if (heredocfinish) {
            line = line+'</span>';
          } else if (!heredoc) {
            line = line.replace('<span class="gp">#</span> ', '<span class="gp no-select"># </span>');
            line = line.replace('<span class="gp">$</span> ', '<span class="gp no-select">$ </span>');
            line = line.replace(/(?:\$\s)/g, '<span class="no-select">$ </span>');
          }
          content.push(line);
        });
        ele.html(content.join('\n'));
      }
    }
  });

  /* Disable "not found" links in the version selector -------------------------------------------*/
  $('#select-version a.disable').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  /* Add image for the pages with deprecated content -------------------------------------------*/
  if ( $('.dropdown-menu li a:first-of-type').hasClass('disable') ) {
    $('#rst-content').addClass('deprecated-content');
  }
});

/**
 * Given a word (open) and a delimiter (close), this functions checks if they match
 * @param {string} open The term used as word after de operator `<<`
 * @param {string} close the term used as delimiter
 * @return {boolean} true if they match, false if they don't
 */
function closes(open, close) {
  return close.replace(/[-\\'"]/g, '') == open.replace(/[-\\'"]/g, '');
}

/**
 * Looks for heredocs within a code-block
 * @param {string} code The HTML code that must be checked
 * @return {array} list o all the heredocs found in the code-block, described by their start and finish lines
 */
function findHeredocs(code) {
  const lines = $(code).text().split('\n');
  const heredocs = [];
  let inHereDoc = false;
  let limitString;
  let start;
  let finish;

  lines.forEach((line, i) => {
    /* If we're inside a heredoc, look for the closing limit string */
    if (inHereDoc) {
      if (closes(limitString, line.trim())) {
        inHereDoc = false;
        finish = i-1;
        /* If the heredoc is empty, we don't add it to the list */
        if (finish > start) {
          heredocs.push({start: start, finish: finish});
        }
      }
    } else if (/<<[^<]/.test(line)) {
      /* Check if the current command starts a heredoc */
      inHereDoc = true;
      start = i+1;
      limitString = line.split('<<')[1].trim();
    }
  });

  return heredocs;
}

/**
 * Filters some of the prompt lines within a code-block depending on the type
 * @param {string} data The text of the code-block that must be filtered
 * @param {boolean} isConsole True if the type of the code-block is 'console'
 * @param {boolean} isBash True if the type of the code-block is 'bash'
 * @return {string} The text of the code-block already filtered
 */
function filterPrompt(data, isConsole = false, isBash = false) {
  if (!isBash) {
    /* Remove prompts with the symbol # only when they cannot be considered comments */
    data = data.replace(/(?:\#\s)/g, '');
  }
  if (isConsole || isBash) {
    /* Remove comment lines (starging with //) */
    data = data.replace(/(^|\n)\/\/.+/g, '');
    /* Remove additional line breaks in command lines to avoid accidental enter inputs */
    data = data.replace(/\n{2,}/g, '\n');
  }
  return data;
}

/**
 * Uses the information on heredocs in order to avoid parsing heredoc content
 * @param {string} code The text of the code-block that must be filtered
 * @param {array} heredocs Information on the heredocs found in this particular code-block
 * @param {boolean} isConsole True if the type of the code-block is 'console'
 * @param {boolean} isBash True if the type of the code-block is 'bash'
 * @return {string} The text of the code-block already filtered buet with the heredocs still intact
 */
function replacePromptOnHeredoc(code, heredocs, isConsole = false, isBash = false) {
  const parsed = [];
  const lines = code.split('\n');
  lines.forEach(function(line, i) {
    const heredoc = heredocs.find( ({start, finish}) => start <= i && finish >= i );
    if ( !heredoc ) {
      line = filterPrompt(line, isConsole, isBash);
    }
    parsed.push(line);
  });

  return parsed.join('\n');
}

/**
 * Compare the numbers of 2 release versions
 * @param {string} version1 First version to compare
 * @param {string} version2 Second version to compare
 * @return {int} Resulting value:
 *  * 1 if version1 > version2
 *  * 0 if version1 = version2
 *  * -1 if version1 < version2
 *  * false if the comparation could not be done
 */
function compareVersion(version1, version2) {
  let result = false;
  if ( typeof(version1) == 'string' && typeof(version2) == 'string') {
    let v1 = version1.split('.');
    let v2 = version2.split('.');
    if ( v1.length >= 2 && v2.length >= 2 ) {
      v1 = v1.map((x) =>parseInt(x));
      v2 = v2.map((x) =>parseInt(x));
      if ( v1[0] > v2[0] ) {
        result = 1;
      } else if ( v1[0] < v2[0] ) {
        result = -1;
      } else {
        if ( v1[1] > v2[1] ) {
          result = 1;
        } else if ( v1[1] < v2[1] ) {
          result = -1;
        } else {
          result = 0;
        }
      }
    }
  }
  return result;
}
