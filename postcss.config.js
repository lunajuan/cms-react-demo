/* eslint-disable import/no-extraneous-dependencies */
const tailwindcss = require('tailwindcss');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const postcssMixins = require('postcss-mixins');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.js', './public/index.html'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [postcssImport, tailwindcss, postcssMixins, postcssNested, autoprefixer, purgecss],
};
