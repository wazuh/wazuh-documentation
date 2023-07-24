versions.reverse();

/* Get path from query string */
let [domain, path] = document.location.href.split('moved-content.html?path=');

let finalUrl = '';
let anchor = '';
domain = document.location.protocol + '//' + document.location.host;
finalUrl = domain;

if ( path !== undefined ) {
  [path, anchor] = path.split('#');
  finalUrl = getRedirectionUrl(domain, path, anchor, versions);
}

document.location = finalUrl;

/**
* Given a URL that doesn't exist in current, use the redirect array to retrieve
* the URL of the latest version of the corresponding content or the URL to not_found
* @param {string} domain current domain of the documentation
* @param {string} path path of the original URL
* @param {string} anchor anchor of the original URL
* @param {string} versions ordered list with all the releases available
* @return {string} The most recent URL to the content that was located in the original URL
*/
function getRedirectionUrl(domain, path, anchor, versions) {
  const notFoundUrl = '/not_found.html';
  let finalPath = '';
  let releaseFolder = '';
  let removed = false;
  let minRelease = false;
  let relatedRedirect;
	const possibleFinalPath = [];
	const possibleFinalRelease = [];
  const excludePaths = [];

  path = '/'+path;
  if ( path[path.length-1] == '/' ) {
    path = path + 'index.html';
  }
	
	/* If the path is in redirectSameRelease replace the path and get the release */
	let changedSameRelease = false;
	Object.keys(redirectSameRelease).forEach((release) => {
		if (changedSameRelease) {
			return;
		}
		let SameInRelease = redirectSameRelease[release];
		if (SameInRelease.hasOwnProperty(path)) {
      releaseFolder = release;
			minRelease = release;
			[path, anchor] = SameInRelease[path].split('#');
			changedSameRelease = true;
		}
	});
  finalPath = path;
  tempPath = path;
  excludePaths.push(path);

  while (tempPath.length > 0) {
    finalPath = tempPath;
    tempPath = '';

    /* Is the path in newUrls? */
    Object.keys(newUrls).forEach((release) => {
      let newInRelease = newUrls[release];
      newInRelease = newInRelease.map((docpath) => docpath[docpath.length-1] == '/' ? docpath + 'index.html' : docpath );
      if (newInRelease.indexOf(finalPath) > -1 ) {
        minRelease = release;
				if (!possibleFinalPath.includes(finalPath)) {
					possibleFinalRelease.push(release);
					possibleFinalPath.push(finalPath);
				}
      }
    });

    if ( minRelease === false ) {
      finalPath = notFoundUrl;
    } else {
      /* Get related redirections and pick the most recent */
      relatedRedirect = getRelatedNewestRedirections(redirections, finalPath, minRelease, anchor, excludePaths);
      if (relatedRedirect.length > 0) {
        /* Get target URL of the most recent redirection */
        relatedRedirect = relatedRedirect[relatedRedirect.length-1];
        minRelease = relatedRedirect['minRelease'];
        tempPath = relatedRedirect['path'];
				if (!possibleFinalPath.includes(tempPath)) {
					possibleFinalRelease.push(minRelease);
					possibleFinalPath.push(tempPath);
				}
        excludePaths.push(tempPath);
      }
    }
  }
	
	/* Select the latest option */
	if (finalPath != notFoundUrl ){
		finalPath = possibleFinalPath[0];
		releaseFolder = possibleFinalRelease[0];
		for (let i = 1; i< possibleFinalPath.length ; i++) {
			if ( compareReleases(possibleFinalRelease[i], releaseFolder) == 1 ) {
				finalPath = possibleFinalPath[i];
				releaseFolder = possibleFinalRelease[i];
			}
		}
	}

  if ( releaseFolder !== false ) {
    /* Is the final path in removedUrls? */
    removed = false;
    Object.keys(removedUrls).forEach((release) => {
      if ( compareReleases(release, releaseFolder) >= 0 ) {
        let removedInRelease = removedUrls[release];
        removedInRelease = removedInRelease.map((docpath) => docpath[docpath.length-1] == '/' ? docpath + 'index.html' : docpath );
        if (removedInRelease.indexOf(finalPath) > -1 ) {
          removed = release;
        }
      }
    });
    if ( removed !== false ) {
      const lastseen = versions[versions.indexOf(removed)-1];
      releaseFolder = lastseen;
    } else {
      releaseFolder = 'current';
    }
  }

  if ( possibleFinalPath.length === 0 ) {
    finalPath = domain + notFoundUrl;
  } else {
    finalPath = domain + '/' + releaseFolder + finalPath;

  }

  return finalPath;
}

/**
* Given a path and a minimum release for said path, retrieves all redirections
* related to that path occurring from the minimum release on
* @param {string} redir array of redirections
* @param {string} currentPath the original path
* @param {string} minRelease minimum release to consider for the redirections (when the path was created)
* @param {string} anchor anchor of the original path if any
* @param {array} excluded list of path to be ignored as a result (they were checked before)
* @return {array} List of all the related redirection happening after the minimum release
*/
function getRelatedNewestRedirections(redir, currentPath, minRelease, anchor, excluded) {
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
          && compareReleases(minRelease, targetReleases[0]) <= 0 ) {
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
        && compareReleases(minRelease, targetReleases[0]) <= 0 ) {
          validRedir = targetReleases[1];
        }
      }
    }

    if ( validRedir && !excluded.includes(redirObject[validRedir]) ) {
      relatedTargets.push(
          {
            'minRelease': validRedir,
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
