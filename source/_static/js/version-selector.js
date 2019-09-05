jQuery(function($) {
  /*
  * Wazuh documentation - Version selector script
  * Copyright (C) 2019 Wazuh, Inc.
  */

  const currentVersion = '3.10';
  const versions = [
    {name: '3.10 (current)', url: '/'+currentVersion},
    {name: '3.9', url: '/3.9'},
    {name: '3.8', url: '/3.8'},
    {name: '3.7', url: '/3.7'},
    {name: '3.6', url: '/3.6'},
    {name: '3.5', url: '/3.5'},
    {name: '3.4', url: '/3.4'},
    {name: '3.3', url: '/3.3'},
    {name: '3.2', url: '/3.2'},
    {name: '3.1', url: '/3.1'},
    {name: '3.0', url: '/3.0'},
    {name: '2.1', url: '/2.1'},
  ];

  checkCurrentVersion();
  checkLatestDocs();

  let selectVersion = true;
  $('#select-version button').click(function() {
    if (selectVersion) {
      addVersions();
      selectVersion = false;
      $('#select-version [data-toggle="tooltip"]').tooltip();
    }
  });

  /**
   * Add the current version to the version selector.
   */
  function checkCurrentVersion() {
    let selected = -1;
    const path = document.location.pathname.split('/')[1];
    const selectVersionCurrent = $('#select-version .current');
    for (let i = 0; i < versions.length; i++) {
      if ( versions[i].url == '/' + path ) {
        selected = i;
      }
    }
    selectVersionCurrent.html(versions[selected].name);
  }

  /**
   * Adds the available versions to the version selector.
   */
  function addVersions() {
    let ele = '';
    const version = $('.version');
    const selectVersion = $('#select-version');
    const selectVersionUl = $('#select-version .dropdown-menu');
    let path = document.location.pathname.split('/')[1];
    let fullUrl = window.location.href;
    let page = '';
    let redCurrent = '';
    let urlTrue = '';

    if (fullUrl == null) {/* Firefox fix */
      fullUrl = document.URL;
    }
    page = fullUrl.split('/'+path)[1];
    page = page.replace('index.html', '');

    if (version == null) {
      console.error('No such element of class "version"');
      return;
    }
    if (selectVersion == null) {
      console.error('No such element "select-version"');
      return;
    }

    if (path == 'current' || path == '3.x' ) {
      path = currentVersion;
    }

    /* Check for redirects for this page */
    for (redItem in redirects) {
      if ({}.hasOwnProperty.call(redirects, redItem)) {
        for (verItem in redirects[redItem]) {
          if ({}.hasOwnProperty.call(redirects[redItem], verItem)) {
            let red = redirects[redItem][verItem];
            red = red.replace('index.html', '');
            if (red.charAt(red.length-1) != '/' && page.charAt(page.length-1) == '/') {
              red = red+'/';
            }
            if (red.charAt(0) != '/') {
              red = '/'+red;
            }
            redirects[redItem][verItem] = red;
            if (red == page) {
              redCurrent = redirects[redItem];
            }
          }
        }
      }
    }

    /* Creates the links to others versions */
    for (let i = 0; i < versions.length; i++) {
      let pageExists = false;
      let href = '';
      let tooltip = '';
      const ver = versions[i].name.split(' (current)')[0];

      /* Get the new URL */
      for (redirect in redCurrent) {
        if (redirect == ver) {
          if (redCurrent[redirect] != '') {
            urlTrue = redCurrent[redirect];
          }
        }
      }

      /* If there isn't redirect */
      if (urlTrue == '') {
        urlTrue = page;
      }

      /* Check if the file exists */
      $.ajax({
        type: 'HEAD',
        url: '/'+ver+urlTrue,
        success: function() {
          pageExists = true;
        },
        error: function() {
          pageExists = false;
        },
        async: false,
      });

      if (!pageExists) {
        tooltip = 'class="disable" data-toggle="tooltip" data-placement="left" title="This page is not available in version ' + versions[i].name +'"';
      } else {
        href = '/'+ver+urlTrue;
        tooltip = '';
      }

      ele += '<li><a href="' + href + '" '+ tooltip +'>'+versions[i].name+'</a></li>';
    }
    selectVersionUl.html(ele);
  }

  /**
    * Shows a warning message to the user if current doc version is not the latest version.
    * Note: For this to work, it requires the documentation version variable (in file conf.py)
    * and the array of versions (in this script) to be updated.
    */
  function checkLatestDocs() {
    const thisVersion = document.querySelector('.no-latest-notice').getAttribute('data-version');
    const latestVersion = versions[0].url.replace('/', '');
    let page = '';
    if ( thisVersion !== latestVersion ) {
      const pageID = document.querySelector('#page');
      pageID.classList.add('no-latest-docs');
    }

    // Updates link to the latest version with the correct path (documentation's home)
    page = document.location.pathname.split('/'+thisVersion)[1];
    const link = document.querySelector('.link-latest');
    link.setAttribute('href', 'https://' + window.location.hostname + '/' + latestVersion + page);
  }
});
