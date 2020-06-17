init();

/**
* Starts the functionality only when the main content is loaded
*/
function init() {
  let redocObserver = null;
  const config = {childList: true};
  const redocLoaded = function(mutationsList, observer) {
    for (i = 0; i < mutationsList.length; i++) {
      if (mutationsList[i].type === 'childList'
      && mutationsList[i].addedNodes[0]
      && mutationsList[i].addedNodes[0].classList.contains('redoc-wrap')) {
        // When redoc is finally loaded
        document.querySelector('body').classList.remove('loading');
      }
    }
  };
  redocObserver = new MutationObserver(redocLoaded);
  redocObserver.observe(document.querySelector('redoc[spec-url]'), config);
}
