const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require('dotenv').config();

// ! ko nên dùng process.env.NODE_ENV trong webpack -> dùng `mode: production` ...

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src', 'index.tsx'), // normal web
    'index-foreground': ['./src/index-foreground.jsx'], // serving chrome extension
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[id].js',
  },
  // nếu assets, entry points có size lớn thì sẽ notice
  performance: {
    hints: false, // off because default là production
    maxEntrypointSize: 400000,
    maxAssetSize: 400000,
  },
  // when import in react, don't need .js .ts -> auto finding
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
  },
  module: {
    rules: [
      // transpiling Javascript vd từ react, es2015+ đến ES5 -> kết hơp .babelrc để config @babel/preset-env", "@babel/preset-react
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // dùng để load typescipt file, better than awesome-type-script
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      // sourcemap dùng cho extract source map từ origninal file -> source map giúp cho debug
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.s?(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: false },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      // ! publicPath is not sure working now
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name].[ext]',
        options: {
          publicPath: 'fonts/',
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
          filename: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    // tạo HTML file để phục vụ bundle (có bundle file .js trong đó), nó sẽ lấy file html nguồn rồi inject bundle file vào
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new WebpackManifestPlugin({ fileName: 'asset-manifest.json' }),
    // new BundleAnalyzerPlugin(),
    // ! chỉ copy từ src folder đến build folder, ko nên copy trong build folder
    // todo thay đổi trong webpack 5, không dùng [] mà dùng {}
    new CopyPlugin([
      { from: path.resolve(__dirname, 'public', 'manifest.json'), to: path.resolve(__dirname, 'build') },
      // banner, logo, images... được đặt trong public sẽ đc organise lại trong `build`
      {
        from: 'public/images/*.png',
        to: 'images/[name].[ext]',
      },
      { from: path.resolve(__dirname, 'public', 'test.js'), to: path.resolve(__dirname, 'build') },
      // inject_script để lấy `index-foreground.js` (chrome react app đc generate bởi webpack entry) để append vào <body>
      { from: path.resolve(__dirname, 'public', 'inject_script.js'), to: path.resolve(__dirname, 'build') },
      // middleware cho chrome listener để giao tiếp chrome extension và react
      { from: path.resolve(__dirname, 'public', 'background.js'), to: path.resolve(__dirname, 'build') },
      { from: path.resolve(__dirname, 'public', 'contentScript.js'), to: path.resolve(__dirname, 'build') },
    ]),
  ],
};
