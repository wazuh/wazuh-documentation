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
        /* When redoc is finally loaded */
        /* Show custom header */
        document.querySelector('.loading').classList.remove('loading');
      }
    }
  };
  redocObserver = new MutationObserver(redocLoaded);
  redocObserver.observe(document.querySelector('redoc[spec-url]'), config);
}

/**
* Makes sure that the toggle button for the menu has always the proper state
* @param {DOMObject} btn Menu toggle button element
*/
function checkMenu(btn) {
  if ( btn ) {
    let menuButtonObserver = null;
    const config = {attributes: true};
    const buttonStatus = function(mutationsList, observer) {
      for (i = 0; i < mutationsList.length; i++) {
        if ( mutationsList[i].attributeName == 'open' ) {
          if ( document.querySelector('redoc[spec-url] .menu-content').hasAttribute('open') ) {
            btn.classList.remove('collapsed');
          } else {
            btn.classList.add('collapsed');
          }
        }
      }
    };
    menuButtonObserver = new MutationObserver(buttonStatus);
    menuButtonObserver.observe(document.querySelector('redoc[spec-url] .menu-content'), config);
  }
}
