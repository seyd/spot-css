![SPOT CSS](https://spotcss.io/img/spot-css-logo-white-cropped.png)

This is the official repository of SPOT CSS framework and Single Place Of Truth Methodology. 

Handle your styles properly! 

Powered by SASS/SCSS.


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
