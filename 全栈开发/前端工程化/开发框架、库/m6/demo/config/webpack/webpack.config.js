/**
 * webpack配置
 * 详细API参考https://webpack.js.org/configuration/
 * Created by xiechunming on 2017/04/20.
 */

const library      = require('./../library'); // 单独打包成js的基础模块，比如react react-dom jQuery等
const entry        = require('./entry');
const output       = require('./output');
const rules        = require('./rules');
const plugins      = require('./plugins');
const resolve      = require('./resolve');
const externals    = require('./externals');
const optimization = require('./optimization');
const utils        = require('./utils');
const apps         = utils.getApp();

// 默认配置的脚手架
module.exports = {
    cache: false,
    devtool: entry.getDevtool(),
    entry: entry.getEntry(apps), // 入口
    output: output.get(),
    plugins: plugins.get(entry.getHtmlPages(apps), apps), // 模式插件
    module: {rules: rules.get()}, // 格式化规则
    resolve: resolve.get(),
    externals: externals.get(),
    optimization: optimization.get(apps),
    performance: {
        hints: false,
    },
    mode: utils.getEnv().env === 'development' ? 'development' : 'production',
    devServer: {
        host: '0.0.0.0',
        hot: true,
        compress: true,
        port: 9999,
        https: false,
        historyApiFallback: true,
        inline: true
    },
};