# js-ts-kit

A JavaScript and TypeScript toolkit for shared code, including reusable variables, helper functions, constants, connectors, and core modules.

## Pre-requisites

Read sources in `References` section to understand how to bundle this library so that it can be used in frontend and backend.

## Important Notes

- This library must be compatible with frontend and backend.
- When updating this library, please make sure to not use any dependencies that only works with 1 environment, such as `bcrypt`, `mongoose`, and `sequelize`.

## Installation

Enter `yarn add js-ts-kit`.

## Release Workflow

Use the npm lifecycle hooks instead of publishing from stale local artifacts.

1. Run `npm test`.
2. Run `npm run pack:check` to inspect the exact tarball contents.
3. Run `npm publish` after the dry run looks correct.

`npm pack` and `npm publish` automatically trigger `prepack`, which rebuilds `dist` before packaging.

## Documentation Site

[https://www.huadylan.com/js-ts-kit/](https://www.huadylan.com/js-ts-kit/)

## References

- [Webpack Concepts](https://webpack.js.org/concepts/)
- [Bundle JavaScript Library](https://webpack.js.org/guides/author-libraries/)
- [Prepare JavaScript Library For Production](https://webpack.js.org/guides/production/)
