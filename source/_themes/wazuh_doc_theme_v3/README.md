# Wazuh Documentation Theme v3.0

This Sphinx theme is designed to give a better reader experience for documentation users on both desktop and mobile devices, with a more accessible design. It also includes some SEO improvements.

This repository includes a working version of the assets this new theme requires, already compiled, concatenated and minified. However, if new changes are required to the style or functionality, the modification must be done on the source files that originate the assets, that is SCSS files for the style and non-minified JavaScript files for the scripts. Once the source files are modified, the assets must be compiled and then updated in the repository so that they can be used in the process of compiling the documentation.

This document explains the basic process for the assets compilation that needs to be done ONLY when the theme needs to be modified (not the content).

## Pre-requisites

The compilation of the theme assets is done using several node packages, thus, having an updated version of Node.js and NPM is the main requirement. You can visit https://docs.npmjs.com/downloading-and-installing-node-js-and-npm for more details.

With Node.js and NPM already installed, we still need to install or update the node packages required for the compilation of the assets. 

### Install/update the Node packages

In order to install or update the Node packages, change to the theme directory, where the file `package.json` is located, that is `source/_themes/wazuh_doc_theme_v3`. On this location run the next command:

```
npm install
```

That's all. This will install the missing packages, remove ones no longer required and update the version of every package to the one specified in `package.json`. 

## Theme assets compilation process

The final compiled and minified assets are included in the repository, however, they might need to be modified. If that is the case, they need to be rebuild once the modification is done, and then committed to the repository again. The theme .min.* files must be updated in the repository before the compilation of the documentation with Sphinx.

**Note**: When possible, avoid changing the theme and the content (.rst files) in the same commit.

These are the steps to make basic modifications to the theme assets:

1. In a new branch, make the required changes to the SCSS files within the folder (or subfolders of) `source/_themes/wazuh_doc_theme_v3/src/scss/` or the JS files within `source/_themes/wazuh_doc_theme_v3/src/js-source/`.
  **Note**: On of the files that needs to be frequently updated is the array of redirects, located in `source/_themes/wazuh_doc_theme_v3/src/js-source/redirect.js`.

2. Rebuild the assets once the change is done. There are several scripts to do this, but they all are run in the same way: `npm run <script>`. These are some options:
  
   - Changes in SCSS and JS: 
      - Build the custom assets of the main documents (excludes Bootstrap, google-fonts CSS, moved-content, index-redirect JS):
      
        ```
        npm run build
        ```
        
        This option can also be run through Makefile in the root of the repository folder:
        
        ```
        make theme
        ```
        
      - Build all the assets (includes all, even Bootstrap):
      
        ```
        npm run build-all
        ```
        
      
   - Changes only in SCSS:
      - Build the custom CSS of the main documents (excludes Bootstrap, google-fonts CSS, moved-content):
      
        ```
        npm run css:build
        ```
        
      - Build all the CSS files (includes all, even Bootstrap):
      
        ```
        npm run css:build-all
        ```
      
   - Changes only in JS:
      - Build the custom JS of the main documents (excludes Bootstrap, moved-content, index-redirect JS):
      
        ```
        npm run js:build
        ```
        
      - Build all the JS files (includes all, even Bootstrap):
      
        ```
        npm run js:build-all
        ```

3. Commit all the changes in the theme files, including the source files in `source/_themes/wazuh_doc_theme_v3/src/scss/` and `source/_themes/wazuh_doc_theme_v3/src/js-source/`, but also the resulting files in `source/_themes/wazuh_doc_theme_v3/static/css/` and `source/_themes/wazuh_doc_theme_v3/static/js/`.

### Updating only the redirects

As the file **redirects.js** is a file that needs to be updated frequently, there is also a make target to directly minify only this file. Therefore, **redirects.min.js** can be updated with one of this options:

a. Go to `source/_themes/wazuh_doc_theme_v3/` and run:

   ```
   npm run js:build:redirects
   ```
  
or
  
b. In the folder containing the Makefile, run:

   ```
   make redirects
   ```

## NPM script reference

This is the list of all npm scripts that has been included in `source/_themes/wazuh_doc_theme_v3/package.json`.

### Final build scripts

#### CSS and JS

`build`: Compiles and minify the main CSS and JS files of the theme. It excludes Bootstrap assets, google-fonts, the assets for moved-content and the redirect of the index.
`build-all`: Compiles and minify all the CSS and JS files of the theme including the ones excluded in `build`.

#### CSS only

`css:build:bootstrap`: Compiles and minifies the Bootstrap SCSS files into `bootstrap.min.css`.
`css:build:moved-content`: Compiles and minifies the SCSS files for the style of the page moved-content into `moved-content.min.css`.
`css:build:google-fonts`: Compiles and minifies the style to preload the google fonts (code inserted inline in the theme).
`css:build:page:default`: Compiles and minifies the SCSS files for the style of all normal documentation content pages into `wazuh-documentation.min.css`.
`css:build:page:api`:  Compiles and minifies the SCSS files for the style of the API reference pages, based on ReDoc, into `api-reference.min.css`.
`css:build:page:index`:  Compiles and minifies the SCSS files for the style of the index page into `index.min.css`.
`css:build:page:not-found`: Compiles and minifies the SCSS files for the style of the not-found page into `not-found.min.css`.
`css:build:page:search`: Compiles and minifies the SCSS files for the style of the search results page into `search-results.min.css`.
`css:build-all`: Compiles, prefixes and minifies all the CSS files of the theme. This runs sequentially the scripts `css:compile-all`, `css:prefix`, `css:minify-all` and `eol:lf`.
`css:build`: Compiles, prefixes and minifies the main CSS files of the theme. It excludes Bootstrap SCSS, google-fonts and the SCSS for moved-content. This runs sequentially the scripts `css:compile`, `css:prefix`, `css:minify` and `eol:lf`.

#### JS only

`js:build:bootstrap`: Compiles and minifies the Bootstrap and Popper scripts files into `bootstrap.bundle.min.js`.
`js:build:moved-content`: Compiles and minifies the code in charge of the redirect to current into `moved-content.min.js`. This is an alias for `js:minify:moved-content`.
`js:build:redirects`: Compiles and minifies the script containing the arrays for the redirects and saves the results to `redirects.min.js`. This is an alias for `js:minify:redirects`
`js:build:index-redirect`: Compiles and minifies the code in charge of the redirect to current/index when the release of the branch is not the latest. It is saved into `index-redirect.min.js`. This is an lias for `js:minify:index-redirect`.
`js:build:page:default`: Compiles and minifies the code required in all the normal documentation content pages into `wazuh-documentation.min.js`.
`js:build:page:index`: Compiles and minifies the scripts required for the index page into `index.min.js`.
`js:build:page:api-reference`: Compiles and minifies the scripts required for the API reference pages, based on ReDoc, into `api-reference.min.js`.
`js:build:page:search`: Compiles and minifies the scripts required for the search page and the search functionality and saves them into `search-results.min.js`.
`js:build:page:not-found`: Compiles and minifies the scripts required for the not-found page into `not-found.min.js`.
`js:build-all`: Compiles and minifies all the JavaScript files of the theme. This runs sequentially the scripts `js:build`, `js:build:bootstrap`, `js:build:moved-contentl` and `js:build:index-redirect`.
`js:build`: Compiles and minifies the main JavaScript files of the theme. It excludes Bootstrap JS files, moved-content and index-redirect, but includes the script containing he redirects. This runs sequentially the scripts `js:build:page:default`, `js:build:page:index`, `js:build:page:api-reference`, `js:build:page:search`, `js:build:page:not-found` and `js:build:redirects`.


### Scripts required for the build process (in-betweens)

#### SCSS compilation

`css:compile:google-fonts`: Compiles the style to preload the google fonts (code inserted inline in the theme).
`css:compile:bootstrap`: Compiles the Bootstrap SCSS files into the in-between file `bootstrap.css`.
`css:compile:moved-content`: Compiles the SCSS files for the page `moved-content` into the in-between file `moved-content.css`.
`css:compile:page:default`: Compiles the SCSS files for the style of all the normal documentation content pages into the in-between file `wazuh-documentation.css`.
`css:compile:page:api`: Compiles the SCSS files for the customization of the style of the pages based on ReDoc. It is saved into the in-between file `api-reference.css`.
`css:compile:page:index`: Compiles the SCSS files for the style of the index page into the in-between file `index.css`.
`css:compile:page:not-found`: Compiles the SCSS files for the style of the not-found page into the in-between file `not-found.css`.
`css:compile:page:search`: Compiles the SCSS files for the style of the search results page into the in-between file `search-results.css`.
`css:compile-all`: Compiles all the SCSS files of the theme. It runs all the css:compile:* scripts listed above in parallel.
`css:compile`: Compiles the main SCSS files of the theme in parallel. This runs some of the scripts listed above: `css:compile:page:default`, `css:compile:page:api`, `css:compile:page:index`, `css:compile:page:not-found` and `css:compile:page:search`.

#### CSS prefix

`css:prefix`: Applies vendor prefixes to all the in-between CSS files, that is to all the compiled but not yet modified CSS files.

#### CSS minification

`css:minify:google-fonts`: Minifies the style to preload the google fonts (code inserted inline in the theme).
`css:minify:bootstrap`:  Minifies the Bootstrap CSS files from `bootstrap.css` into `bootstrap.min.css`.
`css:minify:moved-content`: Minifies the CSS file for the page `moved-content` from `moved-content.css` into `moved-content.min.css`.
`css:minify:page:default`: Minifies the CSS file for  all the normal documentation content pages from `wazuh-documentation.css` into `wazuh-documentation.min.css`.
`css:minify:page:api`: Minifies the CSS file the customization of the style of the pages based on ReDoc from `api-reference.css` into `api-reference.min.css`.
`css:minify:page:index`: Minifies the CSS file for the page `index` from `index.css` into `index.min.css`.
`css:minify:page:not-found`: Minifies the CSS file for the page `not_found` from `not-found.css` into `not-found.min.css`.
`css:minify:page:search`: Minifies the CSS file for the page `search` from `search-results.css` into `search-results.min.css`.
`css:minify-all`: Minifies all the CSS files of the theme. It runs all the css:minify:* scripts listed above in parallel.
`css:minify`: Minifies the main CSS files of the theme in parallel. This runs some of the scripts listed above: `css:minify:page:default`, `css:minify:page:api`, `css:minify:page:index`, `css:minify:page:not-found` and `css:minify:page:search`.

#### Bootstrap's JS files compilation (rollup) and minification

`js:compile:bootstrap`: Compiles the Bootstrap and Popper scripts files into the in-between file `bootstrap.bundle.js`.
`js:minify:bootstrap`: Minifies the Bootstrap and Popper scripts files from `bootstrap.bundle.js` into `bootstrap.bundle.min.js`.

#### Minification for individual JS files

These scripts minifies the JavaScript files that needs to stay separated:

`js:minify:redirects`: Minifies the script containing the arrays for the redirects and saves the results to `redirects.min.js`.
`js:minify:moved-content`: Minifies the code in charge of the redirect to current into `moved-content.min.js`.
`js:minify:index-redirect`: Minifies the code in charge of the redirect to current/index when the release of the branch is not the latest. It is saved into `index-redirect.min.js`.

### Utility scripts 

#### Coding style and error checks
`css:lint`: Notifies code and coding style errors in the SCSS files.
`css:lint:fix`: Fixes trivial code and coding style errors in the SCSS files.
`js:lint`: Notifies code and coding style errors in the JavaScript files.
`js:lint:fix`: Fixes trivial code and coding style errors in the JavaScript files.

#### Clean the intermediate resulting files
`js:clean`: Removes the in-between JavaScript files in `src/js/`.
`css:clean`: Removes the in-between CSS files in `src/css/`.
`clean`: Runs `css:clean` and `js:clean` in parallel, in order to remove all the in-between CSS and JS files.

#### Force UNIX EOF in css and js files
`eol:lf`: Forces UNIX end of line (LF). This is required as the EOL of the files that the package `cleancss` (for minification) creates, depends on the operating system. This script is included by all the other scripts for building the CSS files, though it is applied to JavaScript files too.

#### Watch

`watch`: Waits for changes in the SCSS files or the source JavaScript files and then runs `build` to build the main assets.
`watch-all`: Waits for changes in the SCSS files or the source JavaScript files and then runs `build-all` to build all the assets.
`watch:style`: Waits for changes in the SCSS files and then runs `css:build` to build the main CSS files.
`watch:style-all`: Waits for changes in the SCSS files and then runs `css:build-all` to build all the CSS files.
`watch:scripts`: Waits for changes in the source JavaScript files and then runs `js:build` to build the main scripts.
`watch:scripts-all`: Waits for changes in the source JavaScript files and then runs `js:build-all` to build all the scripts.
