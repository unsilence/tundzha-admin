module.exports = function(webpackConfig, env){
  // webpackConfig配置
  const path = require('path');
  const _ = require('lodash');

  const ROOT_PATH = path.resolve(__dirname);
  const APP_PATH = path.resolve(ROOT_PATH,'src');
  const BUILD_PATH = path.resolve(ROOT_PATH,'dist');

  // 输入配置
  webpackConfig.entry.app = _.assign([],webpackConfig.entry.index);
  delete webpackConfig.entry.index;

  // 输出配置
  webpackConfig.output = {
    path: BUILD_PATH,
    filename: 'static/js/[name].js',
    pathinfo: true,
    publicPath: '/'
  };

  console.log(webpackConfig.output)
  //exit;
  return webpackConfig;
};


/**
 const path = require('path');
 const webpack = require('webpack');
 const webpackDashboardPlugin = require('webpack-dashboard/plugin');
 const htmlWebpackPlugin = require('html-webpack-plugin');

 const ROOT_PATH = path.resolve(__dirname,'..');
 const APP_PATH = path.resolve(ROOT_PATH,'src');
 const BUILD_PATH = path.resolve(ROOT_PATH,'dist');

 module.exports = {
    entry: {
        app: [
            'webpack-hot-middleware/client?reload=true',
            path.resolve(APP_PATH, 'index.js')
        ],
    },
    output: {
        path: path.resolve(BUILD_PATH),
        publicPath: '/',
        filename: 'static/js/[name].js',
    },
    resolve: {
        extensions: ['.js','.jsx','.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader?cacheDirectory=./client/.cache",
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(jpe?g|gif|png|webp|bmp)$/,
                loader: 'file-loader?name=static/images/[name].[ext]',

            },
            {
                test: /\.(svg|woff2?|ttf|eot)\??(.*?)$/,
                loader: 'file-loader?name=static/fonts/[name].[ext]',
            },
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            __BUILD__: JSON.stringify(__BUILD__),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpackDashboardPlugin({port:4001}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash',
            React: 'react',
            ReactDOM: 'react-dom',
            ReactRouter: 'react-router',
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ],
}
 **/
