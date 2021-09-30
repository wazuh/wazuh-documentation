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

TODO

## NPM script reference

This is the list of all npm scripts that has been included in `source/_themes/wazuh_doc_theme_v3/package.json`.

TODO