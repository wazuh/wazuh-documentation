/* Redirection for release note 4.2.0 */

let releaseNoteUrl = '/release-notes/release_4_2_0.html';
let currentPath = window.location.pathname;
    
    if (currentPath.indexOf(releaseNoteUrl) > -1) {        
        newUrl = currentPath.replaceAll('_', '-');
        window.location.replace(newUrl);   
    }