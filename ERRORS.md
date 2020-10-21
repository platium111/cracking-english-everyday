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

- [e_fix_proxy_nodejs] using app.use with res.header with ` res.header('Access-Control-Allow-Headers', '*')`

- [e_webpack_scss] fixing scss with webpack config
  [ref](https://medium.com/better-programming/how-to-set-up-a-react-project-using-webpack-typescript-and-sass-74914421158a)

- [e_fix_html-parser_ts] using tsconfig with `type: node` and typeRoots

- using @import in scss
- define base color using scss
- useRef and handle Enter for search text

15/10/2020

- [e_franc_typescript] fix using import \* as fran from 'franc'
- 2 languages selection

21/10/2020

- add babel
- having webpack build
