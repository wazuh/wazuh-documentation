/* Code to redirect within the same release folder */
const currentPath = '/'+$('body').data('path')+'.html' || '';
let rootLocation = window.location.href;
if (rootLocation[rootLocation.length - 1] == '/') {
  rootLocation = rootLocation + 'index.html';
}
rootLocation = rootLocation.split(currentPath)[0];
if ( redirectSameRelease && Object.keys(redirectSameRelease).length > 0 ) {
  if (redirectSameRelease[DOCUMENTATION_OPTIONS.VERSION]) {
    const newPath = redirectSameRelease[DOCUMENTATION_OPTIONS.VERSION][currentPath];
    if ( newPath ) {
      window.location.replace(rootLocation + newPath);
    }
  }
}
