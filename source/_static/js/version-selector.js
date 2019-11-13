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
  if (selectVersion) {
    addVersions();
    selectVersion = false;
    $('#select-version [data-toggle="tooltip"]').tooltip();
  }

  $(window).on('hashchange', function() {
    addVersions();
  });

  /**
   * Add the current version to the version selector.
   */
  function checkCurrentVersion() {
    let selected = -1;
    let path = document.location.pathname.replace(/\/{2,}/, '/').split('/')[1];
    const selectVersionCurrent = $('#select-version .current');
    if (path == 'current' || path == '3.x' ) {
      path = currentVersion;
    }
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
    const selectVersionUl = $('#select-version .dropdown-menu');
    let path = document.location.pathname.replace(/\/{2,}/, '/').split('/')[1];
    let fullUrl = window.location.href;
    let page = '';
    let paramDivision = [];
    let param = '';

    if (fullUrl == null) {/* Firefox fix */
      fullUrl = document.URL;
    }
    page = fullUrl.split('/'+path)[1];

    paramDivision = page.split('?');
    page = normalizeUrl(paramDivision[0]);
    param = paramDivision.length == 2 ? ('?'+paramDivision[1]) : '';

    if (path == 'current' || path == '3.x' ) {
      path = currentVersion;
    }

    /* Creates the links to others versions */
    let href;
    let tooltip;
    let ver;
    const versionsClean = versions.map(function(i) {
      return (i.name).split(' (current)')[0];
    });

    /* Normalize URLs in arrays */
    for (let i = 0; i < versionsClean.length; i++) {
      if ( newUrls[versionsClean[i]] ) {
        newUrls[versionsClean[i]] = newUrls[versionsClean[i]].map(function(url) {
          return normalizeUrl(url);
        });
      }
      if ( removedUrls[versionsClean[i]] ) {
        removedUrls[versionsClean[i]] = removedUrls[versionsClean[i]].map(function(url) {
          return normalizeUrl(url);
        });
      }
    }

    for (let i = 0; i < redirections.length; i++) {
      for ( release in redirections[i] ) {
        if (Object.prototype.hasOwnProperty.call(redirections[i], release)) {
          redirections[i][release] = normalizeUrl(redirections[i][release]);
        }
      }
    }

    /* Get the redirection history */
    let redirHistory = getRedirectionHistory(page, newUrls, redirections, removedUrls, versionsClean, path);
    let emptyUrls = 0;
    for ( release in redirHistory ) {
      if (!Object.prototype.hasOwnProperty.call(redirHistory, release) || redirHistory[release].length == 0 ) {
        /* Check for empty URLs */
        emptyUrls++;
      }
    }

    if ( emptyUrls == Object.keys(redirHistory).length ) {
      redirHistory = getRedirectionHistory(page.split('#')[0], newUrls, redirections, removedUrls, versionsClean, path);
    }

    for (let i = 0; i < versions.length; i++) {
      href = '';
      tooltip = '';
      ver = versionsClean[i];

      if ( redirHistory[ver].length ) {
        href = '/'+ver+redirHistory[ver]+param;
      } else {
        tooltip = 'class="disable" data-toggle="tooltip" data-placement="left" title="This page is not available in version ' + versions[i].name +'"';
      }

      ele += '<li><a href="' + href + '" '+ tooltip +'>'+versions[i].name+'</a></li>';

      if (ver == currentVersion) {
        $('.no-latest-notice .link-latest').attr('href', href);
      }
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

    /* Updates link to the latest version with the correct path (documentation's home) */
    page = document.location.pathname.split('/'+thisVersion)[1];
    const link = document.querySelector('.link-latest');
    link.setAttribute('href', 'https://' + window.location.hostname + '/' + latestVersion + page);
  }

  /**
   * Get all the redirections concerning this page through the different releases
   * @param {string} page Partial URL of the current page
   * @param {array} listNewUrls Contains the list of all new pages (partial URLs) in each release
   * @param {array} listRedirections Contains the list of all redirections
   * @param {array} listRemovedUrls Contains the list of all pages (partial URLs) removed from each release
   * @param {array} versions Simple list of release versions order from the oldest to the newest one
   * @param {string} verCurrent Current release number
   * @return {array} Returns a list with the correct redirection of the current page for each release
   */
  function getRedirectionHistory(page, listNewUrls, listRedirections, listRemovedUrls, versions, verCurrent) {
    let currentPage = page;
    let redirectionsInvolved;
    let firstSeenIn = getRelease(page, listNewUrls);
    let removedIn;
    let redirectionsTemp = [];
    const keyPoints = {};
    const stackPages = [];
    const checkedPages = [];
    let lastPageFilled = '';
    const redirectionHistory = {};
    let relpair = [];

    keyPoints[firstSeenIn] = page;
    for ( let i = 0; i< listRedirections.length; i++) {
      let found = false;
      if (listRedirections[i]['target'] !== undefined) {
        for (let j=0; j<versions.length-1; j++) {
          if (verCurrent < versions[j] && verCurrent.length <= versions[j].length){
            verPrev = versions[j];
            verNext = verCurrent;
          } else if (verCurrent > versions[j] || (verCurrent < versions[j] && verCurrent.length >= versions[j].length)) {
            verPrev = verCurrent;
            verNext = versions[j];
          } else if (verCurrent == versions[j] && verCurrent.length == versions[j].length) {
            verPrev = verCurrent;
            verNext = versions[j+1];
          }
          if ( listRedirections[i]['target'].includes(verPrev+'=>'+verNext) ) {
            found = true;
          }
        }
      }
      if (found) {
        redirectionsTemp.push(listRedirections[i]);
      }
    }

    /* Get key changes in history */
    stackPages.push(currentPage);
    while ( stackPages.length ) {
      currentPage = stackPages.pop();
      firstSeenIn = getRelease(currentPage, listNewUrls);

      redirectionsInvolved = findRedirectionByPage(currentPage, redirectionsTemp);
      for ( let i = 0; i< redirectionsInvolved.length; i++) {
        relpair = [];

        for (release in redirectionsInvolved[i]) {
          if (Object.prototype.hasOwnProperty.call(redirectionsInvolved[i], release)) {
            if ( release != 'target' ) {
              relpair.push(release);
              if ( !(release in Object.keys(keyPoints)) ) {
                keyPoints[release] = redirectionsInvolved[i][release];
                if ( redirectionsInvolved[i][release] != currentPage &&
                  stackPages.indexOf(redirectionsInvolved[i][release]) == -1 &&
                  checkedPages.indexOf(redirectionsInvolved[i][release]) == -1 ) {
                  stackPages.push(redirectionsInvolved[i][release]);
                }
              }
            }
          }
        }

        tempArray = [];
        if ( relpair.length ) {
          for ( let i = 0; i< redirectionsTemp.length; i++) {
            if ( !(redirectionsTemp[i].hasOwnProperty(relpair[0]) && redirectionsTemp[i].hasOwnProperty(relpair[1])) ) {
              tempArray.push(redirectionsTemp[i]);
            }
          }
          redirectionsTemp = tempArray;
        }
      }
      if ( checkedPages.indexOf(currentPage) == -1 ) {
        checkedPages.push(currentPage);
      }
    }

    /* Know the the release minor on the array keyPoints */
    let releaseMinor = versions[0];
    for (rel in versions) {
      if (Object.prototype.hasOwnProperty.call(versions, rel)) {
        for (rel2 in keyPoints) {
          if (Object.prototype.hasOwnProperty.call(keyPoints, rel2)) {
            if (versions[rel] == rel2) {
              releaseMinor = versions[rel];
            }
          }
        }
      }
    }

    /* Fill the remaining releases in the order they were released */
    for ( let i = versions.length-1; i >= 0; i--) {
      if ( keyPoints[versions[i]] != undefined && keyPoints[versions[i]] != lastPageFilled ) {
        lastPageFilled = keyPoints[versions[i]];
        removedIn = getRelease(lastPageFilled, listRemovedUrls);
      } else {
        if (
          releaseMinor > versions[i] && releaseMinor.length == versions[i].length
          &&
          firstSeenIn <= versions[i] && firstSeenIn.length == versions[i].length
        ) {
          lastPageFilled = keyPoints[releaseMinor];
        }
      }
      if ( removedIn == versions[i] ) {
        lastPageFilled = '';
      }
      redirectionHistory[versions[i]] = lastPageFilled;
    }
    return redirectionHistory;
  }

  /** Auxiliary functions for version selector redirection **/

  /**
   * Gets the release somehow related to a URL (the relation is stablished by the array)
   * @param {string} url Partial URL of the page whose release is required
   * @param {array} urlArray Contains the list of pages related to each release
   *  (new or removed URLs depending on the array)
   * @return {array} Returns the release related to url depending on urlArray
   */
  function getRelease( url, urlArray ) {
    for ( release in urlArray) {
      if ( urlArray[release].indexOf(url) > -1 ) {
        return release;
      }
    }
    return false;
  }

  /**
   * Gets the first redirection in which a given url paticipates.
   * @param {string} url Partial URL of the page possibly participating in a redirection
   * @param {array} redirecttionArray Contains the list of all redirections
   * @return {array} The first redirection in which a given url paticipates.
   *  Empty array if no redirecion is found for the given url
   */
  function findRedirectionByPage(url, redirecttionArray) {
    const result = [];
    let releaseStep = '';
    /* For every redirection registered in redirecttionArray */
    for ( let i = 0; i< redirecttionArray.length; i++) {
      /* Check releases involved in the redirection (2 releases: origin and target) */
      for ( release in redirecttionArray[i] ) {
        if ( release != 'target' ) {
          if ( redirecttionArray[i][release] == url ) {
            for ( target in redirecttionArray[i]['target'] ) {
              if (redirecttionArray[i]['target'][target].includes(release+'=>') && release > releaseStep) {
                releaseStep = release;
                result.push(redirecttionArray[i]);
              }
            }
          }
        }
      }
    }
    return result;
  }

  /**
   * Normalize a given URL so it comply with a standard format
   * @param {string} originalUrl Partial URL of the page that requires normalization
   * @return {string} The standard (valid) version of the original URL
   */
  function normalizeUrl(originalUrl) {
    if (!Array.isArray(originalUrl)) {
      let normalizedURL = originalUrl.replace('index.html', '');
      normalizedURL = normalizedURL.replace(/\/{2,}/, '/');

      if (normalizedURL.charAt(normalizedURL.length-1) == '#' ) {
        normalizedURL = normalizedURL.substring(0, normalizedURL.length-1);
      }

      if (normalizedURL.charAt(normalizedURL.length-1) != '/' && !(/.*(\.html|#.*)$/.test(normalizedURL))) {
        normalizedURL = normalizedURL+'/';
      }
      if (normalizedURL.charAt(0) != '/') {
        normalizedURL = '/'+normalizedURL;
      }

      return normalizedURL;
    } else {
      return originalUrl;
    }
  }
});
