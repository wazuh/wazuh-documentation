/* -----------------------------------------------------------------------------
  Search results page
----------------------------------------------------------------------------- */

if ( $('.search') ) {
  /* List of folders that will be excluded from search */
  // const excludedSearchFolders = ['release-notes'];

  // const searchResults = $('#search-results');
  // 
  // if (searchResults.length > 0) {
  //   let lastResult = null;
  //   let splitURL = null;
  //   const configAdd = {childList: true};
  //   let observerResults = null;
  //   let observerResultList = null;
  //   let observerResultText = null;
  //   let i = 0;
  // 
  //   /* Detects every result that is added to the list */
  //   const addedResult = function(mutationsList, observer) {
  //     for (i = 0; i < mutationsList.length; i++) {
  //       if (mutationsList[i].type === 'childList') {
  //         lastResult = $('ul.search li:last-child');
  //         splitURL = lastResult.children('a').prop('href').split('/');
  //         /* Checks the URL to mark the results found in excludedSearchFolders */
  //         $.each(excludedSearchFolders, function(index, value) {
  //           if ($.inArray(value, splitURL) !== -1) {
  //             lastResult.addClass('excluded-search-result'); /* Marks initially excluded result */
  //             lastResult.addClass('hidden-result'); /* Hides the excluded result */
  //             return false; /* breaks the $.each loop */
  //           }
  //         });
  //       }
  //     }
  //   };
  // 
  //   /* Checking that the list of search results exists */
  //   const existsResultList = function(mutationsList, observer) {
  //     for (i = 0; i < mutationsList.length; i++) {
  //       if (mutationsList[i].type === 'childList' && $(mutationsList[i].addedNodes[0]).hasClass('search')) {
  //         const ulSearch = $('ul.search');
  // 
  //         observerResults.disconnect();
  // 
  //         observerResultList = new MutationObserver(addedResult);
  //         observerResultList.observe(ulSearch[0], configAdd);
  //         observerResultText = new MutationObserver(changeResultText);
  //         observerResultText.observe($('#search-results > p')[0], configAdd);
  //       }
  //     }
  //   };
  // 
  //   /* Replaces the result message */
  //   const changeResultText = function(mutationsList, observer) {
  //     for (i = 0; i < mutationsList.length; i++) {
  //       if (mutationsList[i].type === 'childList') {
  //         observerResultText.disconnect();
  //         const totalResults = $('ul.search li').length;
  //         const excludedResults = $('ul.search li.excluded-search-result').length;
  //         let resultText = '';
  //         if (totalResults > 0) {
  //           if (excludedResults > 0) {
  //             resultText = 'Search finished. Found <span id="n-results">' + (totalResults - excludedResults) + '</span> page(s) matching the search query. <a id="toggle-results" class="include" href="#">Include Release Notes results</a>';
  //           } else {
  //             resultText = 'Search finished. Found <span id="n-results">' + totalResults + '</span> page(s) matching the search query.';
  //           }
  //           $('#search-results > p:first').html(resultText);
  //         }
  //       }
  //     }
  //   };
  // 
  //   observerResults = new MutationObserver(existsResultList);
  //   observerResults.observe(searchResults[0], configAdd);
  // 
  // 
  //   /* Click that allows showing excluded results */
  //   $(document).delegate('#search-results #toggle-results.include', 'click', function() {
  //     const toggleButton = $(this);
  //     const excludedResults = $('ul.search li.excluded-search-result');
  // 
  //     toggleButton.text(toggleButton.text().replace('Include', 'Exclude'));
  //     toggleButton.removeClass('include').addClass('exclude');
  //     $('#search-results #n-results').text($('ul.search li').length);
  // 
  //     excludedResults.each(function(e) {
  //       currResult = $(this);
  //       currResult.hide(0, function() {
  //         $(this).removeClass('hidden-result');
  //       });
  //       currResult.show('fast');
  //     });
  //   });
  // 
  //   /* Click that allows hiding excluded results */
  //   $(document).delegate('#search-results #toggle-results.exclude', 'click', function() {
  //     const toggleButton = $(this);
  //     const excludedResults = $('ul.search li.excluded-search-result');
  // 
  //     toggleButton.text(toggleButton.text().replace('Exclude', 'Include'));
  //     toggleButton.removeClass('exclude').addClass('include');
  //     $('#search-results #n-results').text($('ul.search li').length - excludedResults.length);
  // 
  //     excludedResults.each(function(e) {
  //       currResult = $(this);
  //       currResult.hide('fast', function() {
  //         $(this).addClass('hidden-result');
  //       });
  //     });
  //   });
  // }
}
