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

  addVersions();
  checkLatestDocs();

  /**
   * Adds the available versions to the version selector.
   */
  function addVersions() {
    let ele = '';
    let selected = -1;
    const version = $('.version');
    const selectVersion = $('#select-version');
    const selectVersionCurrent = $('#select-version .current');
    const selectVersionUl = $('#select-version .dropdown-menu');
    let path = document.location.pathname.split('/')[1];
    let page = '';
    if (version == null) {
      console.error('No such element of class "version"');
      return;
    }

    if (selectVersion == null) {
      console.error('No such element "select-version"');
      return;
    }

    page = document.location.pathname.split('/'+path)[1];

    if (path == 'current' || path == '3.x' ) {
      path = currentVersion;
    }

    for (let i = 0; i < versions.length; i++) {
      ele += '<li><a href="' + versions[i].url + page + '">'+versions[i].name+'</a></li>';
      if ( versions[i].url == '/' + path ) {
        selected = i;
      }
    }
    selectVersionUl.append(ele);
    selectVersionCurrent.html(versions[selected].name);
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
