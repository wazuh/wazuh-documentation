jQuery(function($) {
  /*
  * Wazuh documentation - Version selector script
  * Copyright (C) 2021 Wazuh, Inc.
  *
  * EXECUTION FLOW
  * ==============
  *
  * 1. VARS: Versions main constants
  *    - currentVersion
  *    - versions
  *
  * 2. FUNC: Adds the current version to the selector button
  *    - checkCurrentVersion()
  *
  * 3. FUNC: Creates the correct links to all the releases
  *    - addVersions()
  *
  *    | 3.1. FUNC: Normalize a given URL so it comply with a standard format
  *    |    - normalizeUrl()
  *    |
  *    | 3.2. FUNC: Get the redirection history
  *    |    - getRedirectionHistory()
  *
  *         | 3.2.1. FUNC: Get the release key number
  *         |    - getReleaseNum()
  *         |
  *         | 3.2.2. FUNC: Return redirections about a URL
  *         |    - getInfoRedirectUrl()
  *         |
  *         | 3.2.3. FUNC: Get the logic of the redirects
  *         |    - getLogicRedirects()
  *         |
  *         | 3.2.4. FUNC: Find the all the URLs
  *         |    - fillUrls()
  *
  *              | 3.2.4.1. FUNC: Find the following URL
  *              |    - findNextUrl()
  *              |
  *              | 3.2.4.2. FUNC: Find the previous URL
  *              |    - findPrevUrl()
  *
  *         | 3.2.5. FUNC: Return the release when a URL is new
  *         |    - getInfoNewsUrl()
  *         |
  *         | 3.2.6. FUNC: Return the release when a URL was removed
  *         |    - getInfoRemovedUrl()
  *
  * 4. FUNC: Adds the notice "Latest version
  *    - checkLatestDocs()
  *
  * 5. FUNC: Initialize the tooltip of bootstrap
  *    - tooltip()
  *
  */

  /* Versions main constants */
  const thisVersion = DOCUMENTATION_OPTIONS.VERSION;
  const listOfVersions = typeof(versions) === 'undefined' ? [] : versions;

  /* Adds the current version to the selector button */
  checkCurrentVersion();

  /* Creates the correct links to all the releases */
  let documentHistory = addVersions();
  $(window).on('hashchange', function() {
    documentHistory = addVersions();
  });

  /* Adds the notice "Latest version" */
  checkLatestDocs(documentHistory);

  /* Get proper path for the canonical */
  const documentInReleases = Object.keys(documentHistory);
  let canonicalRelease = documentInReleases[documentInReleases.length-1];
  const canonicalPath = documentHistory[canonicalRelease];
  if ( canonicalRelease == listOfVersions[0] ) {
    canonicalRelease = 'current';
  }

  /* Link rel=canonical tag based on the selector */
  if ( !document.querySelector('link[rel=\'canonical\']') ) {
    const canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    canonicalTag.setAttribute('href', document.location.protocol + '//' + document.location.host + '/' + canonicalRelease + canonicalPath);
    document.head.appendChild(canonicalTag);
  }

  /* Initialize the tooltip of bootstrap */
  $('#version-selector [data-toggle="tooltip"]').tooltip({container: 'header', placement: 'left', boundary: 'window'});

  /**
   * Add the current version to the version selector
   */
  function checkCurrentVersion() {
    const selectVersionCurrent = $('#version-selector .current');
    const thisVersion = DOCUMENTATION_OPTIONS.VERSION;
    if ( listOfVersions.length > 0 ) {
      selectVersionCurrent.html('Version ' + thisVersion + (thisVersion == listOfVersions[0] ? ' (current)' : ''));
    } else {
      selectVersionCurrent.html('Version ' + thisVersion);
    }
  }

  /**
    * Shows a warning message to the user if current doc version is not the latest version.
    * Note: For this to work, it requires the documentation version variable (in file conf.py)
    * and the array of versions (in redirects.js) to be updated. Also, don't forget to set
    * `is_latest_release = False` in conf.py
    * @param {Object} redirHistory Contains the corresponding path of the current page in every release.
    */
  function checkLatestDocs(redirHistory) {
    const thisVersion = DOCUMENTATION_OPTIONS.VERSION;
    const latestVersion = listOfVersions[0];
    let page = '';
    if ( thisVersion !== latestVersion ) {
      /* Updates link to the latest version with the correct path */
      page = document.location.pathname;
      if ( page[page.length-1] == '/') {
        page = page+'index.html';
      }
      if ( page.indexOf(thisVersion) != -1 ) {
        page = page.split('/'+thisVersion)[1];
      } else if ( page.indexOf('current') != -1 ) {
        page = page.split('/current')[1];
      }

      const link = document.querySelector('.link-latest');
      let targetURL = 'https://' + window.location.hostname + '/current';
      if ( documentHistory.hasOwnProperty(latestVersion) ) {
        targetURL = targetURL + redirHistory[latestVersion];
      }
      if ( link ) {
        link.setAttribute('href', targetURL);
      }
    }
  }

  /**
   * Adds the available versions to the version selector.
   * @return {Object} Object with the URL history for the current path
   */
  function addVersions() {
    const selectVersionUl = $('#version-selector .dropdown-menu');
    const fullUrl = window.location.href || document.URL; /* Use document.URL as fix for Firefox */
    const hasHttpProtocol = fullUrl.indexOf('http') >= 0;
    let paramDivision = [];
    let ele = '';
    let page = '';
    let param = '';

    if ( listOfVersions.length == 0 ) {
      return {};
    }

    page = hasHttpProtocol ? fullUrl.split(document.location.host)[1] : fullUrl.split('/html')[1];
    page = page[page.length-1] == '/' ? page+'index.html' : page;
    if ( page.indexOf(thisVersion) != -1 ) {
      page = page.split('/'+thisVersion)[1];
      if ( page[page.length-1] !== '/') {
        page = page.split('/');
        page[0] = '';
        page = page.join('/');
      }
    } else if ( page.indexOf('current') != -1 ) {
      page = page.split('/current')[1];
    }
    paramDivision = page.split('?');
    page = normalizeUrl(paramDivision[0]);
    param = paramDivision.length == 2 ? ('?'+paramDivision[1]) : '';

    /* Creates the links to others versions */
    let href;
    let tooltip;
    let ver;
    let versionsCopy = listOfVersions;
    /* Normalize URLs in arrays */
    for (let i = 0; i < versionsCopy.length; i++) {
      if ( newUrls[versionsCopy[i]] ) {
        newUrls[versionsCopy[i]] = newUrls[versionsCopy[i]].map(function(url) {
          return normalizeUrl(url);
        });
      }
      if ( removedUrls[versionsCopy[i]] ) {
        removedUrls[versionsCopy[i]] = removedUrls[versionsCopy[i]].map(function(url) {
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
    const redirHistory = getRedirectionHistory(versionsCopy, thisVersion, page, newUrls, redirections, removedUrls);
    versionsCopy = versionsCopy.reverse();

    /* Print the correct links in the selector */
    for (let i = 0; i < listOfVersions.length; i++) {
      ele = null;
      href = '';
      tooltip = false;
      ver = versionsCopy[i];
      
      if ( redirHistory[ver] != null && redirHistory[ver].length ) {
        if ( i == 0 ) { // the latest release version
          href = '/current'+redirHistory[ver]+param;
        } else {
          href = '/'+ver+redirHistory[ver]+param;
        }
      } else {
        tooltip = true;
      }
      if ( !hasHttpProtocol && href.length > 0 ) {
        href = 'https://documentation.wazuh.com' + href;
      }
      aEle = $(document.createElement('a'));
      aEle.attr('href', href).text(listOfVersions[i] + ((i == 0) ? ' (current)' : ''));
      if ( tooltip !== false ){
        aEle.addClass('disabled')
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'right')
        .attr('title', 'This page is not available in version ' + listOfVersions[i] + ((i == 0) ? ' (current)' : ''));
      }
      ele = $(document.createElement('li'));
      ele.append(aEle);
      if (ver == listOfVersions[0]) {
        $('.no-latest-notice .link-latest').attr('href', href);
      }
      selectVersionUl.append(ele);
    }
    return redirHistory;
  }

  /**
   * Normalize a given URL so it comply with a standard format
   * @param {string} originalUrl Partial URL of the page that requires normalization
   * @return {string} The standard (valid) version of the original URL
   */
  function normalizeUrl(originalUrl) {
    if (!Array.isArray(originalUrl)) {
      let normalizedURL = originalUrl.trim();
      normalizedURL = normalizedURL.replace(/\/$/, '/index.html');
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

      if (!checkEncodeURI(normalizedURL)) {
        normalizedURL = encodeURI(normalizedURL);
      }
      return normalizedURL;
    } else {
      return originalUrl;
    }
  }

  /**
   * Get the redirections history about a URL
   * @param {array} listOfVersions A list with all the releases
   * @param {string} verCurrent The current version
   * @param {string} page The current page URL
   * @param {array} newUrls A list with all the new URL
   * @param {array} redirections A list with all the URL redirections
   * @param {array} removedUrls A list with all the URL removed
   * @return {array} A list with the correct URL
   */
  function getRedirectionHistory(listOfVersions, verCurrent, page, newUrls, redirections, removedUrls) {
    const rtn = [];
    const historyArray = [];
    historyArray[verCurrent] = page;
    let cellTemp = [];
    listOfVersions = listOfVersions.reverse();
    const verCurrentNum = getReleaseNum(verCurrent, listOfVersions);
    let direction = 'toBoth';
    if (verCurrentNum == listOfVersions.length) {
      direction = 'toBottom';
    }
    if (verCurrentNum == 0) {
      direction = 'toTop';
    }

    cellTemp.push({
      'page': page,
      'version': verCurrent,
      'versionNum': verCurrentNum,
      'direction': direction,
    });

    let count = 0;
    while (cellTemp.length) {
      const analyzeUrl = cellTemp.pop();
      let infoUrl = getInfoRedirectUrl(analyzeUrl['page'], redirections);
      let logic = getLogicRedirects(analyzeUrl, infoUrl, listOfVersions);
      if (logic.length == 0) {
        const pageHashArray = analyzeUrl['page'].split('#');
        if ( pageHashArray.length > 1 ) {
          infoUrl = getInfoRedirectUrl(pageHashArray[0], redirections);
          if (infoUrl.length != 0) {
            analyzeUrl['page'] = pageHashArray[0];
          }
        }
        logic = getLogicRedirects(analyzeUrl, infoUrl, listOfVersions);
      }
      while (logic.length) {
        const forLogic = logic.pop();
        const p = forLogic['url'];
        const v = forLogic['release'];
        const d = forLogic['direction'];
        const vn = getReleaseNum(forLogic['release'], listOfVersions);
        const urlNew = {
          'page': p,
          'version': v,
          'versionNum': vn,
          'direction': d,
        };
        cellTemp.push(urlNew);
        historyArray[v] = p;
      }
      if (count >= 1000) {
        cellTemp = [];
        return false;
      }
      count++;
    }

    historyArray1 = fillUrls('toBottom', historyArray, verCurrentNum, listOfVersions);
    historyArray2 = fillUrls('toTop', historyArray, verCurrentNum, listOfVersions);

    for (x in historyArray1) {
      if ({}.hasOwnProperty.call(historyArray1, x)) {
        rtn[x] = historyArray1[x];
      }
    }
    for (x in historyArray2) {
      if ({}.hasOwnProperty.call(historyArray2, x)) {
        rtn[x] = historyArray2[x];
      }
    }

    const pageCreated = getInfoNewsUrl(rtn[listOfVersions[0]], newUrls);
    if (pageCreated !== false) {
      const pageCreatedNum = getReleaseNum(pageCreated['release'], listOfVersions);
      for (r in rtn) {
        if ({}.hasOwnProperty.call(rtn, r)) {
          const rNum = getReleaseNum(r, listOfVersions);
          if (parseInt(rNum) < parseInt(pageCreatedNum)) {
            delete rtn[r];
          }
        }
      }
    }

    const pageRemoved = getInfoRemovedUrl(rtn[listOfVersions[listOfVersions.length-1]], removedUrls);
    if (pageRemoved !== false) {
      const pageRemovedNum = getReleaseNum(pageRemoved['release'], listOfVersions);
      for (r in rtn) {
        if ({}.hasOwnProperty.call(rtn, r)) {
          const rNum = getReleaseNum(r, listOfVersions);
          if (parseInt(rNum) >= parseInt(pageRemovedNum)) {
            delete rtn[r];
          }
        }
      }
    }

    return rtn;
  }

  /**
   * Get the release key number
   * @param {string} key The release number
   * @param {array} listOfVersions A list with all the releases
   * @return {number} The key number
   */
  function getReleaseNum(key, listOfVersions) {
    let verKey = -1;
    for (i in listOfVersions) {
      if (key == listOfVersions[i]) {
        verKey = i;
      }
    }
    return verKey;
  }

  /**
   * Return redirections about a URL
   * @param {string} page The page URL
   * @param {array} redirections A list with all the redirections
   * @return {array} A list with the redirections related with the page URL
   */
  function getInfoRedirectUrl(page, redirections) {
    const redirectionsTemp = [];
    for (forId in redirections) {
      if ({}.hasOwnProperty.call(redirections, forId)) {
        for (forRelease in redirections[forId]) {
          if (forRelease != 'target') {
            if (page == redirections[forId][forRelease]) {
              redirectionsTemp.push(redirections[forId]);
            }
          }
        }
      }
    }
    return redirectionsTemp;
  }

  /**
   * Return the release when a URL is new
   * @param {string} page The page URL
   * @param {array} newUrls A list with all the new pages
   * @return {array|boolean} A list with the new pages related with the page URL
   */
  function getInfoNewsUrl(page, newUrls) {
    let newUrlsTemp = false;
    for (forRelease in newUrls) {
      if ({}.hasOwnProperty.call(newUrls, forRelease)) {
        for (forUrl in newUrls[forRelease]) {
          if ({}.hasOwnProperty.call(newUrls[forRelease], forUrl)) {
            const pageWithoutHash = page.split('#')[0];
            if (pageWithoutHash == newUrls[forRelease][forUrl]) {
              newUrlsTemp = [];
              newUrlsTemp['release'] = forRelease;
              newUrlsTemp['url'] = newUrls[forRelease][forUrl];
            }
          }
        }
      }
    }
    return newUrlsTemp;
  }

  /**
   * Return the release when a URL was removed
   * @param {string} page The page URL
   * @param {array} removedUrls A list with all the removed pages
   * @return {array|boolean} A list with the removeds pages related with the page URL
   */
  function getInfoRemovedUrl(page, removedUrls) {
    let removedUrlsTemp = false;
    for (forRelease in removedUrls) {
      if ({}.hasOwnProperty.call(removedUrls, forRelease)) {
        for (forUrl in removedUrls[forRelease]) {
          if ({}.hasOwnProperty.call(removedUrls[forRelease], forUrl)) {
            const pageWithoutHash = page.split('#')[0];
            if (pageWithoutHash == removedUrls[forRelease][forUrl]) {
              removedUrlsTemp = [];
              removedUrlsTemp['release'] = forRelease;
              removedUrlsTemp['url'] = removedUrls[forRelease][forUrl];
            }
          }
        }
      }
    }
    return removedUrlsTemp;
  }

  /**
   * Get the logic of the redirects
   * @param {array} analyzeUrl Info about the current URL
   * @param {array} infoUrl A list with the redirections related with the page URL
   * @param {array} listOfVersions A list with all the releases
   * @return {array} A list with the URL related with the redirections of the current URL
   */
  function getLogicRedirects(analyzeUrl, infoUrl, listOfVersions) {
    const relatedUrl = [];
    const infoUrlRedirects = infoUrl;
    while (infoUrlRedirects.length) {
      const redirect = infoUrlRedirects.pop();
      for (forTarget in redirect['target']) {
        if ({}.hasOwnProperty.call(redirect['target'], forTarget)) {
          const target = redirect['target'][forTarget].split('=>');
          const originNum = parseInt(getReleaseNum(target[0], listOfVersions));
          const targetNum = parseInt(getReleaseNum(target[1], listOfVersions));
          if (analyzeUrl['page'] == redirect[target[0]]) {
            /* To top */
            if (
              analyzeUrl['direction'] != 'toBottom'
              &&
              originNum < targetNum
              &&
              parseInt(analyzeUrl['versionNum']) <= originNum
            ) {
              relatedUrl.push({
                'release': target[1],
                'direction': 'toTop',
                'url': redirect[target[1]],
              });
            }
            /* To bottom */
            if (
              analyzeUrl['direction'] != 'toTop'
              &&
              originNum > targetNum
              &&
              parseInt(analyzeUrl['versionNum']) >= originNum
            ) {
              relatedUrl.push({
                'release': target[1],
                'direction': 'toBottom',
                'url': redirect[target[1]],
              });
            }
          }
        }
      }
    }
    return relatedUrl;
  }

  /**
   * Find the all the URLs
   * @param {string} direction Indicate the direction to analize the URL array
   * @param {array} historyArray A array with the URL found
   * @param {number} verCurrentNum The number of the current release
   * @param {array} listOfVersions A list with all the releases
   * @return {array} A array with all the URL found
   */
  function fillUrls(direction, historyArray, verCurrentNum, listOfVersions) {
    const historyArrayTemp = [];
    for (forVersions in listOfVersions) {
      if ({}.hasOwnProperty.call(listOfVersions, forVersions)) {
        forVersions = parseInt(forVersions);

        if (direction == 'toBottom') {
          if (forVersions < verCurrentNum) {
            if (historyArray[listOfVersions[forVersions]] == null) {
              /* If the checked version is smaller than the larger version */
              if (forVersions != listOfVersions.length-1) {
                const next = findNextUrl(forVersions, listOfVersions, historyArray);
                if (next != -1) {
                  historyArrayTemp[listOfVersions[forVersions]] = historyArray[listOfVersions[next]];
                }
              }
            } else {
              historyArrayTemp[listOfVersions[forVersions]] = historyArray[listOfVersions[forVersions]];
            }
          }
        }
        if (direction == 'toTop') {
          if (forVersions >= verCurrentNum) {
            if (historyArray[listOfVersions[forVersions]] == null) {
              /* If the tested version is larger than the first version */
              if (forVersions != 0) {
                const prev = findPrevUrl(forVersions, listOfVersions, historyArrayTemp);
                if (prev != -1) {
                  historyArrayTemp[listOfVersions[forVersions]] = historyArrayTemp[listOfVersions[prev]];
                }
              }
            } else {
              historyArrayTemp[listOfVersions[forVersions]] = historyArray[listOfVersions[forVersions]];
            }
          }
        }
      }
    }
    return historyArrayTemp;
  }

  /**
   * Find the following URL
   * @param {number} num The key number of the current release
   * @param {number} listOfVersions A list with all the releases
   * @param {number} historyArray A list with the URL found
   * @return {number} The key number of the next release
   */
  function findNextUrl(num, listOfVersions, historyArray) {
    let found = -1;
    for (i in listOfVersions) {
      if ({}.hasOwnProperty.call(listOfVersions, i)) {
        i = parseInt(i);
        if (i > num) {
          if (historyArray[listOfVersions[i]] != null && found == -1) {
            found = i;
          }
        }
      }
    }
    return found;
  }

  /**
   * Find the previous URL
   * @param {number} num The key number of the current release
   * @param {number} listOfVersions A list with all the releases
   * @param {number} historyArrayTemp A list with the URL found
   * @return {number} The key number of the previous release
   */
  function findPrevUrl(num, listOfVersions, historyArrayTemp) {
    let found = -1;
    for (i in listOfVersions) {
      if ({}.hasOwnProperty.call(listOfVersions, i)) {
        i = parseInt(i);
        if (i >= num) {
          if (historyArrayTemp[listOfVersions[i-1]] != null && found == -1) {
            found = i-1;
          }
        }
      }
    }
    return found;
  }
});

/**
 * Checks if a URI is encoded
 * @param {string} str string containing the URI to be checked
 * @return {boolean} True if the URL seems to be encoded
 */
function checkEncodeURI(str) {
  return /\%/i.test(str);
}

/* Avoid page reload when selecting a non-available release -----------------*/
$('#version-selector a.disable').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
});
