/** Created by xiechunming on 2017/04/14. */

const path = require('path'); // 加载Node的Path模块
const webpack = require('webpack');  // 加载webpack模块
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 额外分开打包
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 加载自动化HTML自动化编译插件

const MXENV = require('./../env'); // 当前项目环境变量路径配置
const utils = require('./utils');

/**
 * 模式插件
 * @param htmlPages 需显示html页面集合
 * @param apps 应用集合
 * @returns {Array.<*>}
 */
exports.get = (htmlPages, apps) => {
    let htmlPlugin = [];// 创建HTML插件
    htmlPages.forEach(p => htmlPlugin.push(new HtmlWebpackPlugin(p)));
    if(utils.getEnv().env === 'development'){ // 开发模式
        return [].concat(_getCommon()).concat(_getDev()).concat(htmlPlugin);
    }else{ // 内测或者生产模式
        return [].concat(_getCommon()).concat(_getProd()).concat(htmlPlugin);
    }
};

/**
 * 通用插件组
 * @returns {[*,*,*]}
 */
function _getCommon() {
    return [
        // 定义环境变量
        new webpack.DefinePlugin({
            'DEV_ENV': JSON.stringify(utils.getEnv()), // 传入开发变量配置
        }),
        new ExtractTextPlugin({ // 抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
            filename: MXENV.output.css + '[name]-runtime.css', // 排除css压缩加载在页面
            allChunks: true,
        }),
    ];
}

/**
 * 开发时使用插件
 * @returns {[*,*,*]}
 */
function _getDev() {
    let _common = [];
    if(utils.getEnv().core){
        _common = [].concat(new webpack.ProvidePlugin({
            'm6-core': path.resolve(process.cwd(), './src/m6-core/index.js'),
        }));
    }
    if(utils.getEnv().operation !== 'build'){
        _common = _common.concat(new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin());
    }
    return _common;
}

// 生产环境下使用插件
function _getProd() {
    return [];
}