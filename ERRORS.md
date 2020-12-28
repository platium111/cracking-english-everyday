10/10/2020

- [n_config_webpack_ts]
  https://www.smashingmagazine.com/2020/05/typescript-modern-react-projects-webpack-babel/

- [n_eslint_code_quality] using this for code quality
- [n_eslint_prettier] configure with eslint and prettier
- using `npx mrm lint-staged` for pre-commit, this will do Prettier + lint before commit

11/10/2020

- webpack.dev.mjs
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

7/11/2020

- amplify commands

* amplify function build
* amplify mock function lookupsentencefunction
* amplify push
* amplify publish

20/12/2020
X separte webpack file | https://stackoverflow.com/questions/49348365/webpack-4-size-exceeds-the-recommended-limit-244-kib
- [webpack_max_size] using hints to false and set maxSizeAsset...
- screen size with bootstrap responsive | https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
  [768, 992) is small size
  [992, 1200) is medium size
  [1200, end] large
X read more about code-splitting | https://webpack.js.org/guides/code-splitting/

21/12/2020
- using multiple SCSS in react | className={`${styles.container} ${style.test}`}
- CSS gradient | https://cssgradient.io/
- Add Select, Input, Button compoents and styling

23/12/2020
- [conflict_bundle_file] in `output` using `[name].bundle.js` |
https://stackoverflow.com/questions/42148632/conflict-multiple-assets-emit-to-the-same-filename
- [cannot_load_jsx_webpack] in test rule add more jsx into rule
- [webpack_generating_css_from_scss] using s?(s|ss) in test rule
- feat: inject component in every page in chrome using `background` | https://www.youtube.com/watch?v=nvm3c6ilcN8

25/12/2020
- [passing_message_content_background] using tab id when call sendMessage
https://stackoverflow.com/questions/27924957/erratic-behavior-of-executescript-cannot-access-a-chrome-url-on-http-www

- Send message from background to React | Using chrome.tab.sendMessage
- Debug chrome in mobile | 
  npm install remotedebug-ios-webkit-adapter -g
  remotedebug_ios_webkit_adapter --port=9000
  chrome://inspect/#devices
  -> in `discover network target` need to add localhost:9000

27/12/2020
- todo fixing size responsive
- [webpack_separating_css_js] in `use`, using MiniCssExtractPlugin.loader instead of style-loader
- frame styling | using `react-frame-component`, so need to have refer to head with style pointing to index.css. This need to be configured in manifest by allowing resource
- customise scrollbar | using `::webkit-scrollbar-thumb`
reference to https://css-tricks.com/custom-scrollbars-in-webkit/
styling https://css-tricks.com/the-current-state-of-styling-scrollbars/

- fixing font | using style in `Frame` component
- lazy loading only for code-splitting, if want to spinning need to use hook with loading status and error

28/12/2020
- using font, images loading local | using url-loader, or file-loader -> add assets file into src/assets or something, from here in jsx file we can using `import` or `url(../assets)`
* even we configure to output in `build` folder, we can't using in src folder React component
- using `link` and refer to google font, then using immediately with `font-family`, not using it in `iframe`, using in child 