var path = require('path');
var webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

console.log(`Webpack isProduction ${isProduction}`)

if (isProduction) {
  var entryPoints = [
    './app/main'
  ];
  var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ];
} else {
  var entryPoints = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './app/main'
  ];
  var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ];
}

console.log(`Webpack entrypoints ${entryPoints}`);

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: entryPoints,
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }]
          ]
        }
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
