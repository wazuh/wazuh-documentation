/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): light-dark-mode.js
 *
 * Code to control the mode switch.
 *
 * --------------------------------------------------------------------------
 */

const switchButton = $('#mode-switch');

if ( switchButton.length > 0 ) {
  const switchButtonLabel = $('#mode-switch-label');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  let currentTheme = localStorage.getItem('theme');
  if ( ! currentTheme ) {
    if ( prefersDarkScheme.matches ) {
      currentTheme = 'dark';
    } else {
      currentTheme = 'light';
    }
  }
  if ( currentTheme == 'dark' ) {
    switchButtonLabel.text('Switch to light mode');
  } else if ( currentTheme == 'light' ) {
    switchButtonLabel.text('Switch to dark mode');
  } else {
    switchButtonLabel.text('Switch mode');
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
    document.documentElement.classList.toggle('light-theme');
    document.documentElement.classList.toggle('dark-theme');
  });
}
