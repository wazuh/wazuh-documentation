/* -----------------------------------------------------------------------------
  Search results page
----------------------------------------------------------------------------- */

const excludedSearchFolders = ['release-notes'];
const pagefindUrl = location.protocol === "file:" ? "" : location.href.split("search.html")[0] + "pagefind/pagefind.js";

$(function() {
if ( $('.search') ) {
  /* List of folders that will be excluded from search */

  const urlParams = new URLSearchParams(window.location.search);
  const resultsContainer = "#search-results";
  const debug = false;

  /* If searh option A, PageFind, is available */
  if ( pagefindUrl.length ) {
    fetch(pagefindUrl, {
      method: 'HEAD'
    })
    .then((response) => {
      if ( response.status !== 200 || response.redirected === true ) {
        /* Fallback to Sphinx search */
        loadSphinxSearch();
      } else {  
        window.pagefind = import(pagefindUrl);
        // pagefind.options = options;
        let resultsFound = 0;
        let excludedResultsCount = 0;

        pagefind.then(
          function(data) {    
            const options = {
              ranking: {
                termFrequency: 0, // 0 - 1
                pageLength: 1, // 0 - 1
                termSaturation: 0 // 0 - 2
              }
            };
            data.options(options);
            const search = data.search;
            const queryTerm = urlParams.get('q');
            if ( typeof(queryTerm) !== 'string' ) {
              return;
            } 
            let highlighedWordstSet = new Set();
            pagefindSearch(queryTerm);
            
            function pagefindSearch(query) {
              if ( query.length === 0 ) {
                updateUI([], resultsContainer, query);
                return;
              }
              search(query, options)
              .then((res) => res.results)
              .then((allresults) => updateUI(allresults, resultsContainer, query));
            }
            
            function updateUI(results, element, query) {
              resultsFound = results.length;
              const elementObj = $(resultsContainer);
              const pageTitle = document.createElement('h1');
              $(pageTitle).text('Search results for: ');
              $('<span class="query-term"></span>').appendTo(pageTitle).text(query);
              elementObj.append(pageTitle);
              const status = $('<p class="search-summary" style="display: none;">&nbsp;</p>').appendTo(elementObj);
              // const resultList = $('<ul class="search-ul"/>').appendTo(elementObj);
              elementObj.append('<ul class="search-ul"/>');
              let resultList = elementObj.children('.search-ul');
              
              status.fadeIn(500);
              let dataPromises = [];
              const origin = location.href.split("search.html")[0];
              const folder = origin.split(location.host)[1];

              /* Display results */              
              for ( let i = 0; i < resultsFound; i++ ) {
                // TODO: append the ordered results, then add the context as the promises are fullfilled
                let listItem = $('<li id="' + results[i].id + '" style="display:none"></li>');
                
                resultList.append(listItem);
                
                dataPromises.push(results[i].data()
                .then((singleResult) => {
                  console.log(singleResult);
                  let linkUrl = "";
                  let titleText, titleLink, breadcrumb;
                  let context;
                  let listItem = $('#'+results[i].id);
                  
                  /* Display result [i] */
                  path = (folder == "" || folder == "/") ? singleResult.url.substring(1) : singleResult.url.split(folder)[1];
                  linkUrl = path;
                  if ( DOCUMENTATION_OPTIONS.URL_ROOT !== "./" ) {
                    linkUrl = DOCUMENTATION_OPTIONS.URL_ROOT + path;
                  }
                  if ( linkUrl[linkUrl.length-1] == '/') {
                    linkUrl = linkUrl+'index.html';
                  }
                  
                  // Title
                  titleText = singleResult.meta.title;
                  if (debug) {
                    titleText += " ("+results[i].score+")";
                  }
                  titleLink = $('<a/>').attr('href', linkUrl)
                  .text(titleText).addClass('result-link');
                  listItem.append(titleLink);

                  // Breadcrumb
                  breadcrumb = createResultBreadcrumb(titleLink);
                  listItem.append(breadcrumb);
                  
                  // Context
                  let excerpt = singleResult.excerpt;
                  
                  context = $('<div/>').addClass('context').html('... ' + excerpt.replace('¶', '') + ' ...');
                  
                  listItem.append(context);
                  
                  $.each(excludedSearchFolders, function(index, value) {
                    if ( path.includes(value+"/") ) {
                      excludedResultsCount++;
                      listItem.addClass('excluded-search-result'); /* Marks initially excluded result */
                      listItem.addClass('hidden-result'); /* Hides the excluded result */
                      return false; /* breaks the $.each loop */
                    }
                  });
                  
                  if ( !listItem.hasClass('hidden-result') ) {
                    listItem.fadeIn(100);
                  }
                  
                }));
              }

              Promise.allSettled(dataPromises).then(([result]) => {
                updateSearchStatus(status, resultsFound, excludedResultsCount);
                if (SPHINX_HIGHLIGHT_ENABLED) {  // set in sphinx_highlight.js
                  highlighedWordstSet = Array.from(highlighedWordstSet);
                  localStorage.setItem("sphinx_highlight_terms", [...highlighedWordstSet].join(" "))
                }
              });
            }
          }
        );
        
      }
    });
  } else {
    /* Otherwise, load search option B, Sphinx search */
    loadSphinxSearch();
  }

  function loadSphinxSearch() {
    getScript(DOCUMENTATION_OPTIONS.URL_ROOT + "_static/js/min/sphinx-search-ui.min.js");
    getScript(DOCUMENTATION_OPTIONS.URL_ROOT + "searchindex.js");
  }

  function getScript(scriptFile) {
    loadScript = document.createElement('SCRIPT');
    
    loadScript.setAttribute("charset", "utf-8");
    loadScript.setAttribute("type", "text/javascript");
    
    loadScript.setAttribute("src", scriptFile);
    document.getElementsByTagName("head")[0].appendChild(loadScript);
  }
}
});

/* Shows excluded results */
$(document).delegate('#search-results #toggle-results.include', 'click', function() {
  const toggleButton = $(this);
  const excludedResults = $('ul.search-ul li.excluded-search-result');
  
  toggleButton.text(toggleButton.text().replace('Include', 'Exclude'));
  toggleButton.removeClass('include').addClass('exclude');
  $('#search-results #n-results').text($('ul.search-ul li').length);
  
  excludedResults.each(function(e) {
    currentResult = $(this);
    currentResult.show('fast');
  });
});

/* Hides excluded results */
$(document).delegate('#search-results #toggle-results.exclude', 'click', function() {
  const toggleButton = $(this);
  const excludedResults = $('ul.search-ul li.excluded-search-result');
  
  toggleButton.text(toggleButton.text().replace('Exclude', 'Include'));
  toggleButton.removeClass('exclude').addClass('include');
  $('#search-results #n-results').text($('ul.search-ul li').length - excludedResults.length);
  
  excludedResults.each(function(e) {
    currentResult = $(this);
    currentResult.hide('normal', function() {
      $(this).addClass('hidden-result');
    });
  });
});

/**
* Generate the breadcrumbs for a particular search result based in the globa
* TOC content.
* @param  {Object} resultLinkNode      JQuery object containing the link from a search result.
* @return {Object}                     JQuery object containing the resulting breadcrumbs node.
*/
function createResultBreadcrumb(resultLinkNode) {
  /* Collect the information */
  const breadcrumbList = [];
  let resultLinkURL = resultLinkNode.attr('href').split('?')[0];
  
  let currentTocNode = $('#global-toc').find('[href="' + resultLinkURL + '"]');
  if ( currentTocNode.length === 0 && resultLinkURL.substring(resultLinkURL.length-1) === '/' ) {
    resultLinkURL = resultLinkURL + 'index.html';
    currentTocNode = $('#global-toc').find('[href="' + resultLinkURL + '"]');
  }
  currentTocNode.parents('li').each(function() {
    tocNodeLink = $(this).find('>a');
    breadcrumbList.push({
      url: tocNodeLink.attr('href'),
      text: tocNodeLink.contents()[0].nodeValue,
    });
  });
  
  const breadcrumbSeparator = $(document.createElement('span'));
  breadcrumbSeparator.addClass('breadcrumb-separator').attr('aria-hidden', 'true');
  
  /* Generate the breadcrumb nodes */
  const breadcrumb = $(document.createElement('nav'));
  breadcrumb.addClass('breadcrumbs');
  for (let i = 0; i< breadcrumbList.length; i++) {
    const a = $(document.createElement('a'));
    a.attr('href', breadcrumbList[i].url).text(breadcrumbList[i].text).addClass('breadcrumb-link');
    breadcrumb.prepend(a);
    breadcrumb.prepend(breadcrumbSeparator.clone(true));
  }
  
  const a = $(document.createElement('a'));
  const homeIcon = $('#home-icon svg');
  let homeHerf = DOCUMENTATION_OPTIONS.URL_ROOT;
  homeHerf = ( homeHerf[homeHerf.length-1] === '/') ? homeHerf + 'index.html' : homeHerf + '/index.html';

  a.attr('href', homeHerf).append(homeIcon.clone(true)).addClass('breadcrumb-link');
  breadcrumb.prepend(a);
  return breadcrumb;
}

/**
 * Updates the information at the begining of the page when the search with PageFinds ends.
 *
 * @param {string} statusElement Contains the element with the text to show as summary of the search results.
 * @param {int} totalResults Total number of results found.
 * @param {int} excludedResults Number of results that can be hidden (from release notes)
 * @returns none
 */
function updateSearchStatus(statusElement, totalResults, excludedResults) {
  if ( totalResults == 0 ){
    statusElement.text('No results.');
    $('<p>Please make sure that all words are spelled correctly.</p>').appendTo(statusElement);
    return;
  }
  let resultText = '';
  if (excludedResults > 0) {
    resultText = 'Found <span id="n-results">' + (totalResults - excludedResults) + '</span> page(s) matching the search query. <a id="toggle-results" class="include" href="#">Include Release Notes results</a>';
  } else {
    resultText = 'Found <span id="n-results">' + totalResults + '</span> page(s) matching the search query.';
  }
  statusElement.html(resultText);
}
