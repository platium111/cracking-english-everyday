const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require('dotenv').config();

const isDevelopment = process.env.NODE_ENV === 'development';
const manifestOptions = { fileName: 'asset-manifest.json' };

console.log('clark env is dev', isDevelopment);

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
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
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
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment,
              minimize: !isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s?(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true },
          },
          'sass-loader',
        ],
      },
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
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    // tạo HTML file để phục vụ bundle (có bundle file .js trong đó), nó sẽ lấy file html nguồn rồi inject bundle file vào
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
    new WebpackManifestPlugin(manifestOptions),
    new BundleAnalyzerPlugin(),
    new CopyPlugin([
      { from: path.resolve(__dirname, 'public', 'manifest.json'), to: path.resolve(__dirname, 'build') },
      {
        from: 'public/*.png',
        to: 'images/[name].[ext]',
      },
      { from: path.resolve(__dirname, 'public', 'test.js'), to: path.resolve(__dirname, 'build') },
      { from: path.resolve(__dirname, 'public', 'background.js'), to: path.resolve(__dirname, 'build') },
      { from: path.resolve(__dirname, 'public', 'inject_script.js'), to: path.resolve(__dirname, 'build') },
      { from: path.resolve(__dirname, 'public', 'contentScript.js'), to: path.resolve(__dirname, 'build') },
    ]),
  ],
};
