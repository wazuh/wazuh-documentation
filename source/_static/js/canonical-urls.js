addCanonicalUrls();

function addCanonicalUrls() {
    var path = location.pathname;
    var host = location.host;
    var isRemoved = false;
    var removedRelease;

    var releases = [
        '3.13', 
        '3.12', 
        '3.11', 
        '3.10', 
        '3.9',
        '3.8',
        '3.7',
        '3.6',
        '3.5',
        '3.4',
        '3.3',
        '3.2',
        '3.1',
        '3.0',
        '2.1'
    ];

    /**
     * Check if the path has redirects
     * Change the path until it has no more redirects
    **/
    var k = 0;

    do {
        k++;
        for (let i = 0; i < redirections.length; i++) {
            let redirection = Object.values(redirections[i]);
            let release = Object.keys(redirections[i]);
            
            for (let j = 0; j < redirection.length; j++) {
                if (path === redirection[1]) {
                    path = redirection[2];
                    host = host.replace(release[1], release[2]);
                }
            }
        }

    } while (k < redirections.length);

    /**
     * Check if the path is removed (in case it isn't, we assume it is available in release 4.0) 
    **/
    releases.forEach(release => {

        if(removedUrls[release] && removedUrls[release].includes(path)) {      
            isRemoved = true;
            if(isRemoved) {
                release = release - 0.1;
                removedRelease = release;
            }
        }

    });

    /**
     * If the path wasn't removed, replace the release number with 4.0
     * If the path was removed, replace the release number with the number of the latest release it was available 
    **/
    for (var i = 0; i < releases.length; i++) {

        if (host.indexOf(releases[i]) > -1) {
            host = isRemoved ? host.replace(releases[i], removedRelease) : host.replace(releases[i], '4.0');
        }

    }

    /**
     * Link rel=canonical tag creation
    **/
    var canonicalTag = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") : document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    
    canonicalTag.setAttribute('href', location.protocol + '//' + host + path);

    document.head.appendChild(canonicalTag);

}