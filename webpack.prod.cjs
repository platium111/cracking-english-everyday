const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    // ! cần nameChunks thì mới set đc custom name
    namedChunks: true,
    // all verder libraries (lodash, moment, react...) will be separated from application code -> nó biến thành 0.js và index.js và index-foreground.js
    // -> tach ra vi caching, code cua minh thay doi nhieu và code vender thay đổi ít nên sẽ đc cho vào cache
    // + có thể dùng với size là bao nhiêu thì sẽ cho ra vender
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
});
