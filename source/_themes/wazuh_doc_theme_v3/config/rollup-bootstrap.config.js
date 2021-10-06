'use strict'

const path    = require('path')
const { babel }   = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

const pkg     = require(path.resolve(__dirname, '../src/js-source/libs/bootstrap/package.json'))
const BUNDLE  = process.env.BUNDLE === 'true'
const year    = new Date().getFullYear()

let fileDest  = 'bootstrap.js'
const external = ['jquery', 'popper.js']
const plugins = [
  babel({
    // Don't transpile source code in node_modules
    exclude: 'node_modules/**',
    // Include the helpers in the bundle, at most one copy of each
    babelHelpers: 'bundled'
  })
]
const globals = {
  jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
  'popper.js': 'Popper'
}

if (BUNDLE) {
  fileDest = 'bootstrap.bundle.js'
  // Remove last entry in external array to bundle Popper
  external.pop()
  delete globals['popper.js']
  plugins.push(nodeResolve())
}

module.exports = {
  input: path.resolve(__dirname, '../src/js-source/libs/bootstrap/index.js'),
  output: {
    banner: `/*!
  * Bootstrap v${pkg.version} (${pkg.homepage})
  * Copyright 2011-${year} ${pkg.author}
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */`,
    file: path.resolve(__dirname, `../src/js/${fileDest}`),
    format: 'umd',
    globals: globals,
    name: 'bootstrap'
  },
  external,
  plugins
}
