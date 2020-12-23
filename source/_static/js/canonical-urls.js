addCanonicalUrls();

function addCanonicalUrls() {
    var path = location.pathname;
    var isRemoved = false;

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

    releases.forEach(release => {

        /* Check if current path is removed */
        if(removedUrls[release] && removedUrls[release].includes(path)) {      
            isRemoved = true;
        }

    });

    for (var i = 0; i < releases.length; i++) {

        /* Replace with 4.0 release number in path if isn't removed */
        if (path.indexOf(releases[i]) > -1) {
            path = isRemoved ? path : path.replace(releases[i], '4.0');
        }

    }
       
    /* Link rel=canonical tag creation */
    var canonicalTag = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") : document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    
    canonicalTag.setAttribute('href', location.protocol + '//' + location.host + path);

    /* Append to head */
    document.head.appendChild(canonicalTag);

}