jQuery(function($) {
  /*
  * Wazuh documentation - Version selector script
  * Copyright (C) 2019 Wazuh, Inc.
  */


  const currentVersion = '3.12';
  const versions = [
    {name: '3.12 (current)', url: '/'+currentVersion},
    {name: '3.11', url: '/3.11'},
    {name: '3.10', url: '/3.10'},
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
    let versionsClean = versions.map(function(i) {
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
    const redirHistory = getRedirectionHistory(versionsClean, path, page, newUrls, redirections, removedUrls);
    versionsClean = versionsClean.reverse();
    for (let i = 0; i < versions.length; i++) {
      href = '';
      tooltip = '';
      ver = versionsClean[i];
      if ( redirHistory[ver] != null && redirHistory[ver].length ) {
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

  /**
   * Get the redirections history about a URL
   * @param {array} versions
   * @param {string} verCurrent
   * @param {string} page
   * @param {array} newUrls
   * @param {array} redirections
   * @param {array} removedUrls
   * @return {array}
   */
  function getRedirectionHistory(versions, verCurrent, page, newUrls, redirections, removedUrls) {
    const rtn = [];
    const history = [];
    history[verCurrent] = page;
    let cellTemp = [];
    versions = versions.reverse();
    const verCurrentNum = getReleaseNum(verCurrent, versions);
    let direction = 'toBoth';
    if (verCurrentNum == versions.length) {
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
      analyzeUrl['page'] = analyzeUrl['page'].split('#')[0];
      infoUrl = getInfoRedirectUrl(analyzeUrl['page'], redirections);
      const logic = getLogicRedirects(analyzeUrl, infoUrl, versions);
      while (logic.length) {
        const forLogic = logic.pop();
        const p = forLogic['url'];
        const v = forLogic['release'];
        const d = forLogic['direction'];
        const vn = getReleaseNum(forLogic['release'], versions);
        const urlNew = {
          'page': p,
          'version': v,
          'versionNum': vn,
          'direction': d,
        };
        cellTemp.push(urlNew);
        history[v] = p;
      }
      if (count >= 1000) {
        cellTemp = [];
        return false;
      }
      count++;
    }

    history1 = fillUrls('toBottom', history, verCurrentNum, versions);
    history2 = fillUrls('toTop', history, verCurrentNum, versions);

    for (x in history1) {
      if ({}.hasOwnProperty.call(history1, x)) {
        rtn[x] = history1[x];
      }
    }
    for (x in history2) {
      if ({}.hasOwnProperty.call(history2, x)) {
        rtn[x] = history2[x];
      }
    }

    const pageCreated = getInfoNewsUrl(rtn[versions[0]], newUrls);
    if (pageCreated !== false) {
      const pageCreatedNum = getReleaseNum(pageCreated['release'], versions);
      for (r in rtn) {
        if ({}.hasOwnProperty.call(rtn, r)) {
          const rNum = getReleaseNum(r, versions);
          if (parseInt(rNum) < parseInt(pageCreatedNum)) {
            delete rtn[r];
          }
        }
      }
    }

    const pageRemoved = getInfoRemovedUrl(rtn[versions[versions.length-1]], removedUrls);
    if (pageRemoved !== false) {
      const pageRemovedNum = getReleaseNum(pageRemoved['release'], versions);
      for (r in rtn) {
        if ({}.hasOwnProperty.call(rtn, r)) {
          const rNum = getReleaseNum(r, versions);
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
   * @param {string} key
   * @param {array} versions
   * @return {number}
   */
  function getReleaseNum(key, versions) {
    let verKey = -1;
    for (i in versions) {
      if (key == versions[i]) {
        verKey = i;
      }
    }
    return verKey;
  }

  /**
   * Return redirections about a URL
   * @param {string} page
   * @param {array} redirections
   * @return {array}
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
   * Return the release when a URL is created
   * @param {string} page
   * @param {array} newUrls
   * @return {array|boolean}
   */
  function getInfoNewsUrl(page, newUrls) {
    let newUrlsTemp = false;
    for (forRelease in newUrls) {
      if ({}.hasOwnProperty.call(newUrls, forRelease)) {
        for (forUrl in newUrls[forRelease]) {
          if (page == newUrls[forRelease][forUrl]) {
            newUrlsTemp = [];
            newUrlsTemp['release'] = forRelease;
            newUrlsTemp['url'] = newUrls[forRelease][forUrl];
          }
        }
      }
    }
    return newUrlsTemp;
  }

  /**
   * Return the release when a URL is removed
   * @param {string} page
   * @param {array} removedUrls
   * @return {array|boolean}
   */
  function getInfoRemovedUrl(page, removedUrls) {
    let removedUrlsTemp = false;
    for (forRelease in removedUrls) {
      if ({}.hasOwnProperty.call(removedUrls, forRelease)) {
        for (forUrl in removedUrls[forRelease]) {
          if (page == removedUrls[forRelease][forUrl]) {
            removedUrlsTemp = [];
            removedUrlsTemp['release'] = forRelease;
            removedUrlsTemp['url'] = removedUrls[forRelease][forUrl];
          }
        }
      }
    }
    return removedUrlsTemp;
  }

  /**
   * Get the logic of the redirects
   * @param {array} analyzeUrl
   * @param {array} infoUrl
   * @param {array} versions
   * @return {array}
   */
  function getLogicRedirects(analyzeUrl, infoUrl, versions) {
    const relatedUrl = [];
    const infoUrlRedirects = infoUrl;
    while (infoUrlRedirects.length) {
      const redirect = infoUrlRedirects.pop();
      for (forTarget in redirect['target']) {
        if ({}.hasOwnProperty.call(redirect['target'], forTarget)) {
          const target = redirect['target'][forTarget].split('=>');
          const originNum = parseInt(getReleaseNum(target[0], versions));
          const targetNum = parseInt(getReleaseNum(target[1], versions));
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
   * @param {string} direction
   * @param {array} history
   * @param {number} verCurrentNum
   * @param {array} versions
   * @return {array}
   */
  function fillUrls(direction, history, verCurrentNum, versions) {
    const historyTemp = [];
    for (forVersions in versions) {
      if ({}.hasOwnProperty.call(versions, forVersions)) {
        forVersions = parseInt(forVersions);

        if (direction == 'toBottom') {
          if (forVersions < verCurrentNum) {
            if (history[versions[forVersions]] == null) {
              if (forVersions != versions.length-1) {
                const next = findNextUrl(forVersions, versions, history);
                if (next != -1) {
                  historyTemp[versions[forVersions]] = history[versions[next]];
                }
              }
            } else {
              historyTemp[versions[forVersions]] = history[versions[forVersions]];
            }
          }
        }
        if (direction == 'toTop') {
          if (forVersions >= verCurrentNum) {
            if (history[versions[forVersions]] == null) {
              if (forVersions != 0) {
                const prev = findPrevUrl(forVersions, versions, historyTemp);
                if (prev != -1) {
                  historyTemp[versions[forVersions]] = historyTemp[versions[prev]];
                }
              }
            } else {
              historyTemp[versions[forVersions]] = history[versions[forVersions]];
            }
          }
        }
      }
    }
    return historyTemp;
  }

  /**
   * Find the following URL
   * @param {number} num
   * @param {number} versions
   * @param {number} history
   * @return {number}
   */
  function findNextUrl(num, versions, history) {
    let found = -1;
    for (i in versions) {
      if ({}.hasOwnProperty.call(versions, i)) {
        i = parseInt(i);
        if (i > num) {
          if (history[versions[i]] != null && found == -1) {
            found = i;
          }
        }
      }
    }
    return found;
  }

  /**
   * Find the previous URL
   * @param {number} num
   * @param {number} versions
   * @param {number} historyTemp
   * @return {number}
   */
  function findPrevUrl(num, versions, historyTemp) {
    let found = -1;
    for (i in versions) {
      if ({}.hasOwnProperty.call(versions, i)) {
        i = parseInt(i);
        if (i >= num) {
          if (historyTemp[versions[i-1]] != null && found == -1) {
            found = i-1;
          }
        }
      }
    }
    return found;
  }
});
