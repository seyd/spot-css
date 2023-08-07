<p align="center">
  <a href="https://spotcss.io/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://spotcss.io/img/spot-css-logo-white-small.png">
      <source media="(prefers-color-scheme: dark)" srcset="https://spotcss.io/img/spot-css-logo-black-small.png">
      <img alt="SPOT CSS" src="https://spotcss.io/img/spot-css-logo-white-small.png" width="376" height="140" style="max-width: 100%;">
    </picture>
  </a>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/spotcss"><img src="https://img.shields.io/badge/npm-spotcss-blue" alt="NPM Package"></a>
    <a href="https://github.com/seyd/spot-css/releases"><img src="https://img.shields.io/badge/version-v2.2.18-green" alt="Latest Release"></a>
    <a href="https://github.com/seyd/spot-css/blob/v2.2.18/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License"></a>
    <img src="https://img.shields.io/badge/coverage-100%25-green" alt="Unit tests coverage">
</p>

<p align="center">
  SPOT CSS stands for "Single Place of Truth" Methodology. <br />
  The ultimate SASS framework and CSS methodology for sustainable styling.<br />
  A clear and semantic way to write CSS.
</p>

------

## Documentation

For full documentation, visit [spotcss.io](https://spotcss.io/).


## Install instructions
Run `$ npm i --save-dev spotcss` to install SPOT CSS package.

Include line `@import "~spotcss";` into your SCSS/SASS files.

## Naming convention

- **simple selector** - select elements based on name, id, class without relations to parents or siblings (no spaces, +, >, ~), e.g `div.wrapper`.

- **combinator selectors** - select elements based on a specific relationship between them (contains spaces, +, >, or ~), e.g. `.wrapper > a`.

- **single selector** - selector which doesn't contain commas. It could be both: simple selector or combinator selectors.

- **multiple selectors** - more single selectors separated by comma, e.g. `div.wrapper, .wrapper > a`.

- **multiple simple selectors** - more simple selectors separated by comma, e.g. `div.wrapper, a.wrapper`.

- **multiple combinator selectors** - more combinator selectors separated by comma, e.g. `div.wrapper span, .wrapper > a`.


## For contributors
### Development instructions
Run `$ npm run test` to run tests once.

Run `$ npm run test:watch` to develop and see the tests result live.

Run `$ npm run doc` to build and open in browser documentation for developers (sassdoc).

If you have not installed *sassdoc*, run `$ npm install -g sassdoc` at first.

Run `$ npm run doc:build` to just rebuild SASS documentation or `$ npm run doc:view` to open it in browser.
