'use strict'

const path = require('path')
const fs = require("fs")
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const UglifyJS = require("uglify-js");
const SRC_PATH = "src/js-source/";
const END_PATH = "static/js/";

const parameter = process.argv[2].replace(/\.\./g,''); 
const FILE = parameter.split('=')[1];
// const cacheFileName = path.resolve(__dirname, "../build/cache.json");

// List of javascript files that must be included in all pages
const commonJS = [
  SRC_PATH + "utils.js",
  SRC_PATH + "components/light-dark-mode.js",
  SRC_PATH + "components/back-to-top.js"
];

// List of javascript files per page
const pageSpecificJS = {
  "wazuh-documentation": [
    SRC_PATH + "components/sphinx-tabs/tabs.js",
    SRC_PATH + "components/admonitions.js",
    SRC_PATH + "components/accordions.js",
    SRC_PATH + "components/doctools.js",
    SRC_PATH + "components/sphinx-search/sphinx_highlight.js",
    SRC_PATH + "components/version-selector.js",
    SRC_PATH + "components/global-toc.js",
    SRC_PATH + "components/local-toc.js",
    SRC_PATH + "components/code-blocks.js",
    SRC_PATH + "content.js"
  ],
  "index": [
    SRC_PATH + "components/doctools.js",
    SRC_PATH + "index.js" //JS code only for page "Index" if necessary.
  ],
  "sphinx-search-ui": [
    SRC_PATH + "components/sphinx-search/language_data.js",
    SRC_PATH + "components/sphinx-search/sphinx-search-ui.js",
    SRC_PATH + "components/sphinx-search/searchtools.js"
    // + JS files only for the sphinx_search
  ],
  "search-results": [
    SRC_PATH + "components/version-selector.js",
    SRC_PATH + "components/global-toc.js",
    SRC_PATH + "components/doctools.js",
    SRC_PATH + "components/sphinx-search/sphinx_highlight.js",
    SRC_PATH + "search-results.js"
    // + JS files only for search page
  ],
  "not-found": [
    SRC_PATH + "components/version-selector.js",
    SRC_PATH + "components/global-toc.js"
    // + JS files only for page "Not found"
  ],
  "api-reference": [
    SRC_PATH + "components/version-selector.js",
    SRC_PATH + "components/doctools.js",
    SRC_PATH + "components/sphinx-search/sphinx_highlight.js",
    SRC_PATH + "custom-redoc.js"
  ],
};

if (pageSpecificJS.hasOwnProperty(FILE)) {
  const outputFilename = END_PATH + "min/" + FILE;
  const options = {
    "compress": {
        "typeofs": false
    },
    "mangle": true,
    "sourceMap": {
      filename: outputFilename + ".min.js",
      url: FILE + ".min.js.map"
    }
  };
  // nameCache: JSON.parse(fs.readFileSync(cacheFileName, "utf8"))
  
  let scriptFiles;
  
  if (FILE !== "sphinx-search-ui") {
    scriptFiles = commonJS.concat(pageSpecificJS[FILE]);
  } else {
    scriptFiles = pageSpecificJS[FILE];
  }
  const code = {};
  for (let i = 0; i < scriptFiles.length; i++) {
    code[scriptFiles[i]] = fs.readFileSync(path.resolve(__dirname, "../" + scriptFiles[i]), "utf8")
  }
  const minified = UglifyJS.minify(code, options);

  if (minified.error) {
    console.log("Error while minifiying the file \"" + FILE + "\": " + JSON.stringify(minified.error));
  } else {
    fs.writeFileSync(outputFilename + ".min.js", minified.code, "utf8");
    console.log("Created the file "+ outputFilename + ".min.js");
    if ( minified.map ) {
      fs.writeFileSync(outputFilename + ".min.js.map", minified.map, "utf8");
      console.log("Created the file "+ outputFilename + ".min.js.map");
    } else {
      console.log("NO MAP!!");
    }
  }
} else {
  console.log("Error: No list available for \""+ FILE +"\"");
}
