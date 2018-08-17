/**
 * Created by xiechunming on 2017/07/07.
 */

const path = require('path'); // 加载Node的Path模块
const webpack = require('webpack');

const MXENV       = require('./../env'); // 当前项目环境变量路径配置
const rules       = require('./rules');
const externals   = require('./externals');
const utils       = require('./utils');

const m6Entry = {};
m6Entry[MXENV.library.m6] = ['./src/m6-core/index.js'];

// 默认配置的脚手架
module.exports = {
    entry: m6Entry, // 入口
    output: {
        path: path.join(process.cwd(), MXENV.path.libM6),
        filename: `[name]-${process.env.npm_package_version}.min.js`,
        library: '[name]',
        libraryTarget: 'var',
    },
    plugins: [
        new webpack.DefinePlugin({
            'DEV_ENV': JSON.stringify(utils.getEnv()), // 传入开发变量配置
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
    module: {rules: rules.get()}, // 格式化规则
    externals: externals.get(),
    performance: {
        hints: false,
    },
    mode: 'production',
};