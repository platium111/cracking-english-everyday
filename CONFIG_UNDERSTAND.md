https://www.smashingmagazine.com/2020/05/typescript-modern-react-projects-webpack-babel/

1. ts.config.json
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
   ]
   }

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
        test: /\.css$/,
        loader: 'css-loader',
      },
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
