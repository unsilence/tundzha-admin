module.exports = function(webpackConfig, env){
  // webpackConfig配置
  const path = require('path');
  const _ = require('lodash');
  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  const HtmlWebpackPlugin = require("html-webpack-plugin");

  const ROOT_PATH = path.resolve(__dirname);
  const APP_PATH = path.resolve(ROOT_PATH,'src');
  const BUILD_PATH = path.resolve(ROOT_PATH,'dist');

  // 输入配置
  webpackConfig.entry.app = _.assign([],webpackConfig.entry.index);
  delete webpackConfig.entry.index;

  // 输出配置
  webpackConfig.output = {
    path: BUILD_PATH,
    filename: 'static/js/[name].[hash:8].js',
    pathinfo: true,
    publicPath: '/'
  };

  // 模块支持
  webpackConfig.module = {
    loaders: [
      {
        exclude: [/\.(js|jsx)$/, /\.(scss|sass|less|css)$/, /\.html$/, /\.json$/,  /\.(jpe?g|gif|png|webp|bmp)$/, /\.(svg|woff2?|ttf|eot)\??(.*?)$/],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/other/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel?cacheDirectory=.cache',
        exclude: /node_modules/
      }, {
        test: /\.(scss|sass)/,
        loader: ExtractTextPlugin.extract('style','css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]','sass','postcss')
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style','css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]','less','postcss')
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]','postcss')
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(jpe?g|gif|png|webp|bmp)$/,
        loader: 'file?name=static/images/[name].[hash:8].[ext]'
      }, {
        test: /\.(svg|woff2?|ttf|eot)\??(.*?)$/,
        loader: 'file?name=static/fonts/[name].[hash:8].[ext]'
      }
    ]
  };

  // 插件增加

  let isExtractTextPlugin = false;

  for(let x in webpackConfig.plugins){
    // webpack替换
    if(webpackConfig.plugins[x].constructor.name == 'ExtractTextPlugin'){
      isExtractTextPlugin = true;
      webpackConfig.plugins[x] = new ExtractTextPlugin("static/css/[name].[hash:8].css");
    }
  }

  if(!isExtractTextPlugin){
    webpackConfig.plugins.push(new ExtractTextPlugin("static/css/[name].[hash:8].css"));
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    title: 'Node Admin',
    filename: path.resolve(BUILD_PATH,'index.html'),
    template: path.resolve(APP_PATH,'entry','index.html'),
    chunks: ['app'],
    inject: true,
    hash: true,
  }));

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
