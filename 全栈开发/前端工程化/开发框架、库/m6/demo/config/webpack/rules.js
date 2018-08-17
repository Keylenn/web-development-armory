/** Created by xiechunming on 2017/04/14. */

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 额外分开打包

const MXENV = require('./../env'); // 当前项目环境变量路径配置
const utils = require('./utils');

/**
 * 获取webpack打包规则
 * @returns {[*,*,*,*,*,*]}
 */
exports.get = () => {
    return [
        _eslint(),
        _json(),
        _mson(),
        _db(),
        _image(),
        _font(),
        _lib(),
        _css(utils.getEnv().env),
        _cssMap(utils.getEnv().env),
        _scss(utils.getEnv().env),
        _js(utils.getEnv().env)
    ];
};

let _js = (env = 'production') => {
    return {
        test: /\.(js|jsx)$/,
        type: 'javascript/auto',
        exclude: [/node_modules/, path.join(process.cwd(), MXENV.path.lib)],
        include: [path.join(process.cwd(), MXENV.path.src)],
        use: [{
            loader: 'babel-loader',
            options: {cacheDirectory: env !== 'production'}
        }],
    };
};

let _lib = () => {
    return {
        test: /\.(js|lib)$/,
        type: 'javascript/auto',
        exclude: [/node_modules/, path.join(process.cwd(), MXENV.path.src)],
        include: [path.join(process.cwd(), MXENV.path.lib)],
        use: [{loader: 'file-loader', options: {name: `${MXENV.output.lib}[name].js`,}}]
    };
};

let _json = () => {
    return {
        test: /\.json$/,
        type: 'javascript/auto',
        exclude: [/node_modules/, path.join(process.cwd(), MXENV.path.lib)],
        include: path.join(process.cwd(), MXENV.path.src),
        use: ['json-loader'],
    };
};

let _mson = () => {
    return {
        test: /\.mson$/,
        type: 'javascript/auto',
        include: path.join(process.cwd(), MXENV.path.src),
        use: [{loader: 'file-loader', options: {name: `${MXENV.output.mson}[name].[ext]`}}]
    };
};

let _html = () => {
    return {
        test: /\.html$/,
        type: 'javascript/auto',
        use: ['underscore-template-loader']
    };
};

let _db = () => {
    return {
        test: /\.(tab|sql|fnc|vw|prc)$/,
        type: 'javascript/auto',
        include: path.join(process.cwd(), MXENV.path.src),
        use: [{loader: 'file-loader', options: {name: `${MXENV.output.db}[hash:8].[name].[ext]`}}]
    };
};

let _image = () => {
    return {
        test: /\.(png|jpeg|jpg|gif|svg|svgz|md|ico)$/,
        type: 'javascript/auto',
        exclude: [/node_modules/],
        include: path.join(process.cwd(), MXENV.path.src),
        use: [{loader: 'file-loader', options: { name: `${MXENV.output.image}[name].[ext]` }}]
    };
};

let _font = () => {
    return {
        test: /\.(woff|eot|ttf|otf|woff2)$/,
        type: 'javascript/auto',
        include: path.join(process.cwd(), MXENV.path.src),
        use: [{loader: 'file-loader', options: {name: `${MXENV.output.font}[name].[ext]`}}]
    };
};

let _eslint = () => {
    return {
        test: /\.(js|jsx)$/,
        type: 'javascript/auto',
        enforce: 'pre',
        exclude: [/(node_modules)/, path.join(process.cwd(), MXENV.path.lib)],
        include: path.join(process.cwd(), MXENV.path.src),
        use: ['eslint-loader']
    };
};

let _css = (env = 'production') => {
    return {
        test: /\.css$/,
        type: 'javascript/auto',
        exclude: [/node_modules/, path.join(process.cwd(), MXENV.path.src + 'app/module/')],
        use: [{loader: 'file-loader', options: { name: `${MXENV.output.css}[name].[ext]` }}]
    };
};
/** css.map文件 */
let _cssMap = (env = 'production') => {
    return {
        test: /\.map$/,
        type: 'javascript/auto',
        exclude: /node_modules/,
        use: [{
            loader: 'file-loader',
            options: {name: `${env === 'production' ? MXENV.output.css : ''}[name].[ext]`}
        }]
    };
};

let _scss = (env = 'production') => {
    return {
        test: /\.scss$/,
        type: 'javascript/auto',
        exclude: [/node_modules/, path.join(process.cwd(), MXENV.path.src + 'res/')],
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{loader: 'css-loader'}, {loader: 'sass-loader'}]
        })
    };
};