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
        // Show custom header
        document.querySelector('body').classList.remove('loading');

        // Change toggle-menu button
        const removed = document.querySelector('.sc-cLQEGU.bPGAgL');
        const btn = removed.parentNode;
        const icon = document.createElement('i');
        icon.classList.add('x');
        btn.removeChild(removed);
        btn.classList.add('btn-close');
        btn.classList.add('collapsed');
        btn.appendChild(icon);

        btn.addEventListener('click', function() {
          if (this.classList.contains('collapsed')) {
            this.classList.remove('collapsed');
          } else {
            this.classList.add('collapsed');
          }
        });
      }
    }
  };
  redocObserver = new MutationObserver(redocLoaded);
  redocObserver.observe(document.querySelector('redoc[spec-url]'), config);
}
