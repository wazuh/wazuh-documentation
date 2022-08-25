/* -----------------------------------------------------------------------------
  Search results page
----------------------------------------------------------------------------- */

if ( $('.search') ) {
  window.addEventListener('DOMContentLoaded', (event) => {
    if ( window.PagefindUI ) {
      /* Pagefind search available */
      new PagefindUI({
        element: "#search-results",
        showImages: false
      });
      
      /* Load query trem from the url on load */
      const urlParams = new URLSearchParams(window.location.search);
      $('.pagefind-ui__search-input').val(urlParams.get('q'));
      
    } else {
      /* Fallback to Sphinx search */
      getScript(DOCUMENTATION_OPTIONS.URL_ROOT + "_static/js/min/sphinx-search-ui.min.js");
      getScript(DOCUMENTATION_OPTIONS.URL_ROOT + "searchindex.js");
    }
  });

  function getScript(scriptFile){
    loadScript = document.createElement('SCRIPT');
    
    loadScript.setAttribute("charset", "utf-8");
    loadScript.setAttribute("type", "text/javascript");
    
    loadScript.setAttribute("src", scriptFile);
    document.getElementsByTagName("head")[0].appendChild(loadScript);
  }
}
