10/10/2020

- [n_config_webpack_ts]
  https://www.smashingmagazine.com/2020/05/typescript-modern-react-projects-webpack-babel/

- [n_eslint_code_quality] using this for code quality
- [n_eslint_prettier] configure with eslint and prettier
- using `npx mrm lint-staged` for pre-commit, this will do Prettier + lint before commit

11/10/2020

- webpack.config.mjs
- script using webpac with --config
- type: module in package.json

- setting proxy server
- setting webpack

12/10

- [e_fix_200ok_but_not_get_sentences_data]
  because query I have `http://..../vi \n",` -> careful with breakline in quote mark
- [n_print_nested_obj]
  `util.inspect(obj, {showHidden: false, depth: null})`

14/10/2020

- [e_domhandler_webpack_ts]
  "types": ["node"] in tsconfig will fix errors
  npm install @types/node --save-dev

  [ref](https://stackoverflow.com/questions/54232428/cannot-find-type-definition-file-for-node-in-typescript-react-app)

- [e_ts_import_scss]
  "typeRoots": ["node_modules/@types", "src/typings"],
  in tsconfig
