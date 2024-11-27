const fs = require('node:fs');
const path = require('node:path');

const autoprefixer = require('autoprefixer');
const postCssImport = require('postcss-import');
const postCssGlobalData = require('@csstools/postcss-global-data');
const postCssCustomMedia = require('postcss-custom-media');
const postCssMediaMinMax = require('postcss-media-minmax');
const postCssNested = require('postcss-nested');

let globalFiles = [];
const omuiCssRoot = path.resolve('./node_modules/@oreillymedia/omui/dist');
if (fs.existsSync(omuiCssRoot)) {
  globalFiles = [path.join(omuiCssRoot, 'custommedia.css')];
}

module.exports = {
  // Note that plugins are processed from first to last, and that order can be
  // important.
  plugins: [
    postCssImport,
    postCssGlobalData({
      files: globalFiles,
    }),
    postCssCustomMedia({
      preserve: true,
    }),
    postCssMediaMinMax,
    postCssNested,
    autoprefixer({ remove: false }),
  ],
};
