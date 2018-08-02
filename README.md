# esmc [![npm version][npmv-img]][npmv-url] [![github release][ghrelease-img]][ghrelease-url] [![License][license-img]][license-url]

> :fire: Modern JavaScript, today. :sparkles: Blazingly fast zero-config compiler, built on [**@Babel**](https://github.com/babel/babel) and [**@ESLint**](https://github.com/eslint/eslint) (and [**@FlowType**](https://flow.org)).

<p align="center">
  <a href="https://github.com/olstenlarck/esmc">
    <img src="./logo.jpg", width="35%">
  </a>
</p>
<br>

<div id="thetop"></div>

[![XAXA code style][codestyle-img]][codestyle-url]
[![CircleCI linux build][linuxbuild-img]][linuxbuild-url]
[![CodeCov coverage status][codecoverage-img]][codecoverage-url]
[![DavidDM dependency status][dependencies-img]][dependencies-url]
[![Renovate App Status][renovateapp-img]][renovateapp-url]
[![Make A Pull Request][prs-welcome-img]][prs-welcome-url]
[![Semantically Released][new-release-img]][new-release-url]

If you have any _how-to_ kind of questions, please read the [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) documents.  
For bugs reports and feature requests, [please create an issue][open-issue-url] or ping [@tunnckoCore](https://twitter.com/tunnckoCore) at Twitter.

[![Conventional Commits][ccommits-img]][ccommits-url]
[![Become a Patron][patreon-img]][patreon-url]
[![Share Love Tweet][shareb]][shareu]
[![NPM Downloads Weekly][downloads-weekly-img]][npmv-url]
[![NPM Downloads Monthly][downloads-monthly-img]][npmv-url]
[![NPM Downloads Total][downloads-total-img]][npmv-url]

Project is [semantically](https://semver.org) & automatically released on [CircleCI][codecoverage-url] with [new-release][] and its [New Release](https://github.com/apps/new-release) GitHub App.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Notes](#notes)
- [Related Projects](#related-projects)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [Users](#users)
- [License](#license)

## Install
This project requires [**Node.js**](https://nodejs.org) **^8.9.0 || ^10.6.0**. Install it using [**yarn**](https://yarnpkg.com) or [**npm**](https://npmjs.com).  
_We highly recommend to use Yarn when you think to contribute to this project._

```bash
$ yarn add esmc

# or globally
$ yarn global add esmc
```

## Usage
<!--  -->

1. Put your files in `src/`
2. Run it easily with `esmc`
3. Done.

Basically it creates:

- `dist/nodejs` folder for Node.js 8.9 
  + or any passed version to `ESMC_NODE_VERSION` environment variable
  + pass `dist/nodejs/index.js` to your `pkg.module` field, if you are not using `--no-esm` flag
- `dist/browsers` folder for `>= 1%, not dead, not IE <= 11, last 1 Opera versions` browsers
  + or anything passed to `ESMC_BROWSERSLIST` environment variable
  + pass `dist/browsers/index.js` to your favorite bundler
- `dist/nodejs/__index.js` using [esm][], so you can just use it in CJS
  + pass it to your `pkg.main` field if you are not using `--no-esm` flag,
  + otherwise just pass `dist/nodejs/index.js` there
- generates `.js.flow` files _only_ on `dist/nodejs` folder, if `--flow` is passed

## Notes

By default does not compiles to CommonJS. That's intentional, because bundlers handles ES Modules great. If you want pure CommonJS pass `--no-esm` flag.

- It's mostly instantaneous, because it compiles only files that are changed
- Babel config is basically externalized as [babel-preset-esmc][]
  + pass `--no-build` to disable Babel transpilation
  + note that you cannot use `--no-build` and `--no-esm` together
- Linting is done, based on [eslint-config-esmc][]
- If you love static typing, just pass `--flow` flag and it will run type checking before any compilation phase
  + **note** that you should install [flow-bin][] yourself on your project and configure its [.flowconfig](https://flow.org/en/docs/config/) file
- All errors, of any phase, are styled similar to ESLint's `codeframe` reporter, so everything is just freaking awesome
- It does not compiles common tests file patterns (if they are in your source directory)
- To run your files using the same config, you can pass `esmc/register` as `--require` hook
- You can use `esmc lint` to only lint your files, using ESLint
- You can use `esmc build` to only compile your source files, using Babel
- Use `--force` flag to start fresh (it deletes `dist` and cleans up the caches)

To try it out, clone the repo, `yarn install` and run `yarn cli` - this will
compile everything from `example-src/` folder as was described above. 

- Make some lint error and run it `yarn cli` 
- Make some type error there and run `yarn cli --flow`
- Make some build error and run `yarn cli`

You will see that style of all errors are similar to ESLint's `codeframe` reporter. 

**[back to top](#thetop)**

## Related Projects
Some of these projects are used here or were inspiration for this one, others are just related. So, thanks for your existance!
- [asia](https://www.npmjs.com/package/asia): Blazingly fast, magical and minimalist testing framework, for Today and Tomorrow | [homepage](https://github.com/olstenlarck/asia#readme "Blazingly fast, magical and minimalist testing framework, for Today and Tomorrow")
- [babel-preset-esmc](https://www.npmjs.com/package/babel-preset-esmc): Sharebale and the default Babel preset for the `esmc` compiler | [homepage](https://github.com/olstenlarck/babel-preset-esmc "Sharebale and the default Babel preset for the `esmc` compiler")
- [charlike](https://www.npmjs.com/package/charlike): Small, fast, simple and streaming project scaffolder for myself, but not… [more](https://github.com/tunnckoCore/charlike) | [homepage](https://github.com/tunnckoCore/charlike "Small, fast, simple and streaming project scaffolder for myself, but not only. Supports hundreds of template engines through the @JSTransformers API or if you want custom `render` function passed through options")
- [eslint-config-esmc](https://www.npmjs.com/package/eslint-config-esmc): Shareable and the default config for the `esmc` compiler | [homepage](https://github.com/olstenlarck/eslint-config-esmc "Shareable and the default config for the `esmc` compiler")
- [gitcommit](https://www.npmjs.com/package/gitcommit): Lightweight and joyful `git commit` replacement. Conventional Commits compliant. | [homepage](https://github.com/tunnckoCore/gitcommit "Lightweight and joyful `git commit` replacement. Conventional Commits compliant.")
- [new-release](https://www.npmjs.com/package/new-release): A stable alternative to [semantic-release][]. Only handles NPM publishing and nothing… [more](https://github.com/tunnckoCore/new-release#readme) | [homepage](https://github.com/tunnckoCore/new-release#readme "A stable alternative to [semantic-release][]. Only handles NPM publishing and nothing more. For creating GitHub releases use the Semantic Release GitHub App")
- [xaxa](https://www.npmjs.com/package/xaxa): Zero-config linting, powered by few amazing unicorns, AirBnB & Prettier. | [homepage](https://github.com/olstenlarck/xaxa "Zero-config linting, powered by few amazing unicorns, AirBnB & Prettier.")

**[back to top](#thetop)**

## Contributing
Please read the [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) documents for advices.  
For bugs reports and feature requests, [please create an issue][open-issue-url] or ping [@tunnckoCore](https://twitter.com/tunnckoCore) at Twitter.

## Contributors
Thanks to the hard work of [these wonderful people](./CONTRIBUTORS.md) this project is alive and it also follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.  
[Pull requests](https://github.com/tunnckoCore/contributing#opening-a-pull-request), stars and all kind of [contributions](https://opensource.guide/how-to-contribute/#what-it-means-to-contribute) are always welcome. :stars:

## Users
You can see who uses `esmc` in the [USERS.md](./USERS.md) file. Please feel free adding this file if it not exists.  
If you or your organization are using this project, consider adding yourself to the list of users.  
**Thank You!** :heart:

## License
Copyright (c) 2018-present, [Charlike Mike Reagent][author-link] `<olsten.larck@gmail.com>`.  
Released under the [Apache-2.0 License][license-url].

---

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.7.0, on August 02, 2018._

<!-- Heading badges -->
[npmv-url]: https://www.npmjs.com/package/esmc
[npmv-img]: https://badgen.net/npm/v/esmc?icon=npm

[ghrelease-url]: https://github.com/olstenlarck/esmc/releases/latest
[ghrelease-img]: https://badgen.net/github/release/olstenlarck/esmc?icon=github

[license-url]: https://github.com/olstenlarck/esmc/blob/master/LICENSE
[license-img]: https://badgen.net/npm/license/esmc

<!-- Front line badges -->

[codestyle-url]: https://github.com/olstenlarck/eslint-config-esmc
[codestyle-img]: https://badgen.net/badge/code%20style/esmc/purple

[linuxbuild-url]: https://circleci.com/gh/olstenlarck/esmc/tree/master
[linuxbuild-img]: https://badgen.net/circleci/github/olstenlarck/esmc/master?label=build&icon=circleci

[codecoverage-url]: https://codecov.io/gh/olstenlarck/esmc
[codecoverage-img]: https://badgen.net/codecov/c/gh/olstenlarck/esmc

[dependencies-url]: https://david-dm.org/olstenlarck/esmc
[dependencies-img]: https://badgen.net/david/dep/olstenlarck/esmc?label=deps

[ccommits-url]: https://conventionalcommits.org/
[ccommits-img]: https://badgen.net/badge/conventional%20commits/v1.0.0/dfb317

[new-release-url]: https://github.com/tunnckoCore/new-release
[new-release-img]: https://badgen.net/badge/semantically/released/05c5ff

[downloads-weekly-img]: https://badgen.net/npm/dw/esmc
[downloads-monthly-img]: https://badgen.net/npm/dm/esmc
[downloads-total-img]: https://badgen.net/npm/dt/esmc

[renovateapp-url]: https://renovatebot.com
[renovateapp-img]: https://badgen.net/badge/renovate/enabled/green

[prs-welcome-img]: https://badgen.net/badge/PRs/welcome/green
[prs-welcome-url]: http://makeapullrequest.com

[paypal-donate-url]: https://paypal.me/tunnckoCore/10
[paypal-donate-img]: https://badgen.net/badge/$/support/purple

[patreon-url]: https://www.patreon.com/bePatron?u=5579781
[patreon-img]: https://badgen.net/badge/become/a%20patron/F96854?icon=patreon

[shareu]: https://twitter.com/intent/tweet?text=https://github.com/olstenlarck/esmc&via=tunnckoCore
[shareb]: https://badgen.net/badge/twitter/share/1da1f2
[open-issue-url]: https://github.com/olstenlarck/esmc/issues/new
[author-link]: https://tunnckocore.com

[babel-preset-esmc]: https://github.com/olstenlarck/babel-preset-esmc
[eslint-config-esmc]: https://github.com/olstenlarck/eslint-config-esmc
[esm]: https://github.com/standard-things/esm
[flow-bin]: https://github.com/flowtype/flow-bin
[new-release]: https://github.com/tunnckoCore/new-release
[semantic-release]: https://github.com/semantic-release/semantic-release