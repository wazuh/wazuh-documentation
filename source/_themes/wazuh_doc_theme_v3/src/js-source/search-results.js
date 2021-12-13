/* -----------------------------------------------------------------------------
  Search results page
----------------------------------------------------------------------------- */

if ( $('.search') ) {
/* Optinally hiding search results (release note) --------------------------- */
  /* List of folders that will be excluded from search */
  const excludedSearchFolders = ['release-notes'];

  const searchResults = $('#search-results');

  if (searchResults.length) {
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

          /* Generate breadcrumb */
          const resultNode = mutationsList[i].addedNodes[0];
          const breadcrumb = createResultBreadcrumb($(resultNode).find('.result-link'));
          breadcrumb.insertAfter($(resultNode).find('.result-link'));
        }
      }
    };

    /* Checks that the list of search results exists */
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
              resultText = 'Found <span id="n-results">' + (totalResults - excludedResults) + '</span> page(s) matching the search query. <a id="toggle-results" class="include" href="#">Include Release Notes results</a>';
            } else {
              resultText = 'Found <span id="n-results">' + totalResults + '</span> page(s) matching the search query.';
            }
            $('#search-results > p:first').html(resultText);
          }
        }
      }
    };

    observerResults = new MutationObserver(existsResultList);
    observerResults.observe(searchResults[0], configAdd);

    /* Shows excluded results */
    $(document).delegate('#search-results #toggle-results.include', 'click', function() {
      const toggleButton = $(this);
      const excludedResults = $('ul.search li.excluded-search-result');

      toggleButton.text(toggleButton.text().replace('Include', 'Exclude'));
      toggleButton.removeClass('include').addClass('exclude');
      $('#search-results #n-results').text($('ul.search li').length);

      excludedResults.each(function(e) {
        currentResult = $(this);
        currentResult.hide(0, function() {
          $(this).removeClass('hidden-result');
        });
        currentResult.show('fast');
      });
    });

    /* Hides excluded results */
    $(document).delegate('#search-results #toggle-results.exclude', 'click', function() {
      const toggleButton = $(this);
      const excludedResults = $('ul.search li.excluded-search-result');

      toggleButton.text(toggleButton.text().replace('Exclude', 'Include'));
      toggleButton.removeClass('exclude').addClass('include');
      $('#search-results #n-results').text($('ul.search li').length - excludedResults.length);

      excludedResults.each(function(e) {
        currentResult = $(this);
        currentResult.hide('normal', function() {
          $(this).addClass('hidden-result');
        });
      });
    });
  }

  /**
   * Generate the breadcrumbs for a particular search result based in the globa
   * TOC content.
   * @param  {Object} resultLinkNode      JQuery object containing the link from a search result.
   * @return {Object}                     JQuery object containing the resulting breadcrumbs node.
   */
  function createResultBreadcrumb(resultLinkNode) {
    /* Collect the information */
    const breadcrumbList = [];

    const currentTocNode = $('#global-toc').find('[href="' + resultLinkNode.attr('href').split('?')[0] + '"]');
    currentTocNode.parents('li').each(function() {
      tocNodeLink = $(this).find('>a');
      breadcrumbList.push({
        url: tocNodeLink.attr('href'),
        text: tocNodeLink.text(),
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
    a.attr('href', $('.logo-link.docs').attr('href')).text('Documentation').addClass('breadcrumb-link');
    breadcrumb.prepend(a);
    return breadcrumb;
  }
}
