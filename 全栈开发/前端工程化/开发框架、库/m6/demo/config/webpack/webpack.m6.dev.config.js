/**
 * Created by xiechunming on 2017/07/09.
 */

const path = require('path'); // 加载Node的Path模块
const webpack = require('webpack');  // 加载webpack模块

const MXENV       = require('./../env'); // 当前项目环境变量路径配置
const rules       = require('./rules');
const externals   = require('./externals');
const utils       = require('./utils');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: './src/m6-core/index.js',
    },
    output: {
        path: path.join(process.cwd(), './library-dev/m6-core/'),
        publicPath: './',
        filename: '[name].js',
        library: 'm6-core',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'DEV_ENV': JSON.stringify(utils.getEnv()), // 传入开发变量配置
        }),
    ],
    // 模式插件
    module: {rules: rules.get()}, // 格式化规则
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.mson'],
    },
    externals: externals.get(),
    performance: {
        hints: false,
    },
};