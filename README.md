<p align="center">
  <a href="https://spotcss.io/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://spotcss.io/img/spot-css-logo-white-small-transparent.png">
      <source media="(prefers-color-scheme: dark)" srcset="https://spotcss.io/img/spot-css-logo-black-small-transparent.png">
      <img alt="SPOT CSS" src="https://spotcss.io/img/spot-css-logo-white-small.png" width="376" height="140" style="max-width: 100%;">
    </picture>
  </a>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/spotcss"><img src="https://img.shields.io/badge/npm-spotcss-blue" alt="NPM Package"></a>
    <a href="https://github.com/seyd/spot-css/releases"><img src="https://img.shields.io/badge/version-v2.2.19-green" alt="Latest Release"></a>
    <a href="https://github.com/seyd/spot-css/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License"></a>
    <img src="https://img.shields.io/badge/coverage-100%25-green" alt="Unit tests coverage">
</p>

<p align="center">  
  The ultimate SASS framework and CSS methodology for sustainable styling.<br />
  A clear and semantic way to write CSS.<br />
  Aspiring industry standard for writing styles.
</p>

------

<br />

## What is it about?

<p>SPOT CSS is a pure SASS framework and is primarily about the structure of CSS code. It is forcing component base approach and relies on maximum semantic code.</p>
<p>If you don't like the approach of utility first frameworks like Tailwind and you don't want to write inline styles on steroids, which is easy to write, but damn hard to read and maintain, this is the framework for you.</p>
<br />
<p align="center">
  <a href="https://spotcss.io/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://spotcss.io/img/spot-css-code-light.gif">
      <source media="(prefers-color-scheme: dark)" srcset="https://spotcss.io/img/spot-css-code-dark.gif">
      <img alt="SPOT CSS" src="https://spotcss.io/img/spot-css-code-light.jpg" style="max-width: 100%;">
    </picture>
  </a>
</p>

You can play with the live demo here: [spotcss.io](https://spotcss.io/)
<br />
<br />

## Installation
Run `$ npm i --save-dev spotcss` or `$ yarn add --dev spotcss` to install SPOT CSS package.

Include line `@import "~spotcss";` into your SCSS/SASS files.

<br />

## Documentation

We offer 4 ways to explain our methodology and framework:

- **[Cheat Sheet](https://spotcss.io/cheat-sheet)** - `takes 3 minutes` - Select what you want to do and find out how to do it in SPOT CSS framework.

- **[Quick start guide](https://spotcss.io/quick-start-guide)** - `takes 15 minutes` - The quickest way to see the way style is written in this framework, without explanation of why it is so and what are the advantages of such an approach.

- **[Tutorial](https://spotcss.io/tutorial)** - `takes 1 hour` - A basic overview that is organized so that it can be read from start to end and so that the reader understands the fundamental principles and basic ways of using the framework.

- **[Documentation](https://spotcss.io/docs/intro)** - `takes hours` - Comprehensive documentation of everything, organized by mixins and framework entities, so you can quickly find exactly what you want to learn more about.

Choose the one that fits your current needs best.

<br />

## Pros

### Clear to read
Even those who are not familiar with our methodology and framework understand the written code, because it has an intuitive syntax.

### Easy to write
Because every line has a clear meaning and context, you can learn syntax very quickly and parser will help you not to break the rules.

### Natural to think that way
You are already thinking in term of components, elements, states, variants an contexts. Just write and read it just like that.

### Just SASS
Pure SASS framework with no other dependencies, javascript, or pre/post processor. So it's usable in any ecosystem (JS, PHP, Rubby, Python...)

<br />

## Cons

### SASS syntax
Everyone uses the SCSS syntax. So why SASS? Because of @include. But you can use the SCSS syntax if you want. But it's ugly and cluttered. See [the differences](https://spotcss.io/docs/sass-syntax).

### New mixins
SPOT CSS code is based on mixins and functions. Most of them produce selectors. It's easy to learn because they are semantic. See the [Quick start guide](https://spotcss.io/quick-start-guide).

### No utility classes
If you are used to using utility classes exclusively, this approach is different. It is component based. But you can use utility classes sometimes, but in moderation.

### Too strict
SPOT CSS framework forces you to follow many rules and will yell at you when you break some of them. But that's the advantage, it's basically an implicit linter. You can get around partially this with +mode('draft').

<br />

## Other benefits

### Universal
The SPOT CSS approach is compatible with most types of projects and methodologies. Even with BEM. What it is not compatible with is utility first class frameworks.

### Standardized
With SPOT CSS basically everyone writes the same code. Or at least very similar. Therefore, it can serve as a company standard for how to structure and write CSS.

### Easy to refactor
If your project is written as component based CSS, but over time you've gotten into an unmaintainable state, refactoring to SPOT CSS is a matter of a few days.

<br />

## Community

### Discord
Join our SPOT CSS community and enjoy our prompt support on [Discord](https://discord.gg/cyCXkZmJzm).

### Looking for contributors
If you are interested in any of this and you know how to code in JS or SASS, we can make amazing and useful tools together. I'm on my own for now on this project and any help will be appreciated. Contact me on our [Discord](https://discord.gg/cyCXkZmJzm) - Johnny Seyd (@Seyd#6245)

<br />

## License

The SPOT CSS Framework and methodology is released under the [MIT License](https://github.com/seyd/spot-css/blob/master/LICENSE).

<!--
## Naming convention

- **simple selector** - select elements based on name, id, class without relations to parents or siblings (no spaces, +, >, ~), e.g `div.wrapper`.

- **combinator selectors** - select elements based on a specific relationship between them (contains spaces, +, >, or ~), e.g. `.wrapper > a`.

- **single selector** - selector which doesn't contain commas. It could be both: simple selector or combinator selectors.

- **multiple selectors** - more single selectors separated by comma, e.g. `div.wrapper, .wrapper > a`.

- **multiple simple selectors** - more simple selectors separated by comma, e.g. `div.wrapper, a.wrapper`.

- **multiple combinator selectors** - more combinator selectors separated by comma, e.g. `div.wrapper span, .wrapper > a`.

<br />

## For contributors
### Development instructions
Run `$ npm run test` to run tests once.

Run `$ npm run test:watch` to develop and see the tests result live.

Run `$ npm run doc` to build and open in browser documentation for developers (sassdoc).

If you have not installed *sassdoc*, run `$ npm install -g sassdoc` at first.

Run `$ npm run doc:build` to just rebuild SASS documentation or `$ npm run doc:view` to open it in browser.
-->
