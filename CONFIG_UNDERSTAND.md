https://www.smashingmagazine.com/2020/05/typescript-modern-react-projects-webpack-babel/

1. ts.config.json
   ```
   {
   "compilerOptions": {
   "jsx": "react", // support jsx in .tsx file ~ mean can write jsx code
   "module": "commonjs", // generate module code
   "noImplicitAny": true, // raise errors if declaring `any`
   "outDir": "./build/",
   "preserveConstEnums": true, // preserve enum at compiling, enum will be array of value
   "removeComments": true, // remove comments when generate JSDoc
   "sourceMap": true, // generate .map file -> is used for debugging
   "target": "es5" -> transpile our code to es5
   },
   "include": [
   "src/index.tsx" // -> specify file list is included
   ],
   "typeRoots": ["node_modules/@types", "src/typings"], // fix typescript with other libraries
    "types": ["node"] // this one also fix some libs typescript
   }
   ```

-@types/react-html-parser
-"react-html-parser"
-"@types/domhandler"
-"@types/node"

2. import lib

```
  npm install --save-dev
    @types/react @types/react-dom awesome-typescript-loader
    html-webpack-plugin mini-css-extract-plugin source-map-loader css-loader
    typescript
    webpack webpack-cli webpack-dev-server
```

- awesome-typescript-loader | when see .ts or .tsx will transpiling
- plugin & loader for webpack
  html-webpack-plugin mini-css-extract-plugin source-map-loader

3. Webpack

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
      test: /\.s(a|c)ss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { modules: true }
        },
        'sass-loader'
      ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: './src/App.style.css',
    }),
  ],
};
```

4. Eslint

```
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error", { "endOfLine": "auto" }] // fixing ; at end of the line
  },
  "parserOptions": { // fixing reverse const keyword
    "ecmaVersion": 2017
  },
  "env": {
    "es6": true
  },
  "parser": "babel-eslint" // fixing arrow function errors
}
}
```

5.package.json
`"server": "node-env-run server --exec nodemon | pino-colada",` // with `server` is package, it will find index.js as default

- `node-env-run` is used to load env config before running something, using with --exect nodemon to run something -`npm-run-all` run multiple script, shortcut `run-p` means run parallel
  * `node-env-run server --exec` is used to run something else, instead of `node`

webpack config scss
-"css-modules-typescript-loader"
-"node-sass" -> using to load scss file which using C language
-"sass-loader" -> using in webpack rule | using for scss/sass convert to css
-"css-loader" -> take css file with imports and url for webpack
-"style-loader" -> inject css to DOM
