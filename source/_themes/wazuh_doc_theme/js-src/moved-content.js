const listOfReleases = [
  '2.1',
  '3.0',
  '3.1',
  '3.2',
  '3.3',
  '3.4',
  '3.5',
  '3.6',
  '3.7',
  '3.8',
  '3.9',
  '3.10',
  '3.11',
  '3.12',
  '3.13',
  '4.0',
  '4.1',
  '4.2',
  '4.3',
];

/* Get path from query string */
let [domain, path] = document.location.href.split('moved-content.html?path=');

let finalUrl = '';
let anchor = '';
domain = document.location.protocol + '//' + document.location.host;
finalUrl = domain;

if ( path !== undefined ) {
  [path, anchor] = path.split('#');
  finalUrl = getRedirectionUrl(domain, path, anchor, listOfReleases);
}

document.location = finalUrl;

/**
* Given a URL that doesn't exist in current, use the redirect array to retrieve
* the URL of the latest version of the corresponding content or the URL to not_found
* @param {string} domain current domain of the documentation
* @param {string} path path of the original URL
* @param {string} anchor anchor of the original URL
* @param {string} listOfReleases ordered list with all the releases available
* @return {string} The most recent URL to the content that was located in the original URL
*/
function getRedirectionUrl(domain, path, anchor, listOfReleases) {
  const notFoundUrl = domain + '/not_found.html';
  let finalPath = '';
  let removed = false;
  let created = false;
  let relatedRedirect;
  const excludePaths = [];

  path = '/'+path;
  if ( path[path.length-1] == '/' ) {
    path = path + 'index.html';
  }
  finalPath = path;
  tempPath = path;
  excludePaths.push(path);

  while (tempPath.length > 0) {
    finalPath = tempPath;
    tempPath = '';
    created = false;

    /* Is the path in newUrls? */
    Object.keys(newUrls).forEach((release) => {
      let newInRelease = newUrls[release];
      newInRelease = newInRelease.map((docpath) => docpath[docpath.length-1] == '/' ? docpath + 'index.html' : docpath );
      if (newInRelease.indexOf(finalPath) > -1 ) {
        created = release;
      }
    });
    if ( created === false ) {
      finalPath = notFoundUrl;
    } else {
      /* Get related redirections and pick the most recent */
      relatedRedirect = getRelatedNewestRedirections(redirections, finalPath, created, anchor, excludePaths);

      if (relatedRedirect.length > 0) {
        /* Get target URL of the most recent redirection */
        relatedRedirect = relatedRedirect[relatedRedirect.length-1];
        created = relatedRedirect['created'];
        tempPath = relatedRedirect['path'];
        excludePaths.push(tempPath);
      }
    }
  }
  if ( created !== false ) {
    /* Is the final path in removedUrls? */
    removed = false;
    Object.keys(removedUrls).forEach((release) => {
      if ( compareReleases(release, created) > 0 ) {
        let removedInRelease = removedUrls[release];
        removedInRelease = removedInRelease.map((docpath) => docpath[docpath.length-1] == '/' ? docpath + 'index.html' : docpath );
        if (removedInRelease.indexOf(finalPath) > -1 ) {
          removed = release;
        }
      }
    });
    if ( removed !== false ) {
      const lastseen = listOfReleases[listOfReleases.indexOf(removed)-1];
      finalPath = domain + '/' + lastseen + finalPath;
    } else {
      finalPath = domain + '/current' + finalPath;
    }
  }

  return finalPath;
}

/**
* Given a path and a minimum release for said path, retrieves all redirections
* related to that path occurring from the minimum release on
* @param {string} redir array of redirections
* @param {string} currentPath the original path
* @param {string} created minimum release to consider for the redirections (when the path was created)
* @param {string} anchor anchor of the original path if any
* @param {array} excluded list of path to be ignored as a result (they were checked before)
* @return {array} List of all the related redirection happening after the minimum release
*/
function getRelatedNewestRedirections(redir, currentPath, created, anchor, excluded) {
  const relatedTargets = [];
  let anchorfound = false;

  /* Get only the related redirections (any) */
  for (let i = 0; i < redir.length; i++) {
    const redirObject = redir[i];
    let validRedir = false;

    if ( anchor !== undefined) {
      /* Paths with anchor have preference if they exist */
      if ( Object.values(redirObject).indexOf(currentPath+'#'+anchor) != -1 ) {
        const targets = redirObject['target'];
        for ( let j = 0; j < targets.length; j++ ) {
          const targetReleases = targets[j].split('=>');
          if ( compareReleases(targetReleases[0], targetReleases[1]) < 0
          && compareReleases(created, targetReleases[0]) <= 0 ) {
            validRedir = targetReleases[1];
            anchorfound = true;
          }
        }
      }
    }
    if ( anchorfound === false && Object.values(redirObject).indexOf(currentPath) != -1 ) {
      const targets = redirObject['target'];
      for ( let j = 0; j < targets.length; j++ ) {
        const targetReleases = targets[j].split('=>');
        if ( compareReleases(targetReleases[0], targetReleases[1]) < 0
        && compareReleases(created, targetReleases[0]) <= 0 ) {
          validRedir = targetReleases[1];
        }
      }
    }

    if ( validRedir && !excluded.includes(redirObject[validRedir]) ) {
      relatedTargets.push(
          {
            'created': validRedir,
            'path': redirObject[validRedir],
          },
      );
    }
  }
  return relatedTargets;
}

/**
* Given 2 release strings, determine their order
* @param {string} first first release as first operand of the comparisson
* @param {string} second second release as second operand of the comparisson
* @return {int} Possible results:
*     * false => there was an error
*     * 1 => first is newer
*     * 0 => same release
*     * -1 => second is newer
*/
function compareReleases(first, second) {
  const firstNumbers = first.split('.');
  const secondNumbers = second.split('.');
  if ( firstNumbers.length < 2 || secondNumbers.length < 2 ) {
    return false;
  }

  /* Comparing majors */
  firstNumbers[0] = parseInt(firstNumbers[0]);
  secondNumbers[0] = parseInt(secondNumbers[0]);
  /* The major of the first release is newer */
  if ( firstNumbers[0] > secondNumbers[0] ) {
    return 1;
  }
  /* The major of the second release is newer */
  if ( firstNumbers[0] < secondNumbers[0] ) {
    return -1;
  }

  /* Same major. Comparing minors */
  firstNumbers[1] = parseInt(firstNumbers[1]);
  secondNumbers[1] = parseInt(secondNumbers[1]);
  /* The minor of the first release is newer */
  if ( firstNumbers[1] > secondNumbers[1] ) {
    return 1;
  }
  /* The minor of the second release is newer */
  if ( firstNumbers[1] < secondNumbers[1] ) {
    return -1;
  }
  /* Same minor */
  return 0;
}
