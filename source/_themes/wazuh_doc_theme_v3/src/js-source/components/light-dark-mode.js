/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): light-dark-mode.js
 * --------------------------------------------------------------------------
 */

const switchButton = $('#mode-switch');

if ( switchButton.length > 0 ) {
  const switchButtonLabel = $('#mode-switch-label');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  let currentTheme = localStorage.getItem('theme');

  if (currentTheme == 'dark') {
    document.body.classList.toggle('dark-theme');
  } else if (currentTheme == 'light') {
    document.body.classList.toggle('light-theme');
  } else if ( prefersDarkScheme.matches ) {
    document.body.classList.toggle('dark-theme');
    currentTheme = 'dark';
  } else {
    document.body.classList.toggle('light-theme');
    currentTheme = 'light';
  }

  /* Update button status */
  switchButton.attr('class', currentTheme);

  switchButton.on('click', function() {
    let theme;

    if ( this.classList[0] == 'dark' ) {
      theme = 'light';
      switchButtonLabel.text('Switch to dark mode');
    } else {
      theme = 'dark';
      switchButtonLabel.text('Switch to light mode');
    }
    switchButton.attr('class', theme);
    localStorage.setItem('theme', theme);
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
  });
}
