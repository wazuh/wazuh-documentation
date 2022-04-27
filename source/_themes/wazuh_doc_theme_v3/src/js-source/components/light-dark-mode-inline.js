/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): light-dark-mode-inline.js
 *
 * Inline code that loads the appropiate theme mode.
 *
 * --------------------------------------------------------------------------
 */

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme == 'dark') {
  document.documentElement.classList.toggle('dark-theme');
} else if (currentTheme == 'light') {
  document.documentElement.classList.toggle('light-theme');
} else if ( prefersDarkScheme.matches ) {
  document.documentElement.classList.toggle('dark-theme');
} else {
  document.documentElement.classList.toggle('light-theme');
}
