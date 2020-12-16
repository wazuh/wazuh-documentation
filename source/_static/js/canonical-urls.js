addCanonicalUrls();

function addCanonicalUrls() {
    var path = location.pathname;

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

        //Check if URL is available in 4.0    
        if(removedUrls[release] && removedUrls[release].includes(path)) {      
            return;
        }else{
            //Replace release in path to be 4.0
            if(path.includes(release)) {
                path = path.replace(release, '4.0');
            }
        }
        
    });
       
    /* Link rel=canonical tag creation */
    var canonicalTag = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") : document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    
    canonicalTag.setAttribute('href', location.protocol + '//' + location.host + path);

    /* Append to head */
    document.head.appendChild(canonicalTag);

}
