/**
 * Created by xiechunming on 2017/04/23.
 */

const MXENV = require('./../env'); // 当前项目环境变量路径配置
const utils = require('./utils');

/**
 * 设置入口文件
 * @param apps 应用集合
 * @returns {{}}
 */
exports.getEntry = apps => {
    let entries = {};
    let compiledSize = 0; // 激活app数目
    apps.forEach(app => {
        if(app.compiled){ // 判断是否加入编译,如果app还未开发好,就设置为false
            let entry = [app.src];
            /*if(utils.getEnv().env === 'development'){ // 开发模式
                entry.push('webpack-hot-middleware/client?name=' + app.id);
            }*/
            entries[app.id] = entry;
            compiledSize += 1;
        }
    });
    return entries;
};

/**
 * 定义HTML页面入口
 * @param apps 应用集合
 * @returns {Array}
 */
exports.getHtmlPages = apps => {
    let htmlPages = []; // 定义HTML文件入口
    let compiledSize = 0; // 激活app数目
    let _localCDN = [
        './lib/react.min.js', './lib/react-dom.min.js', './lib/redux.min.js',
        './lib/react-redux.min.js', './lib/react-router-dom.min.js',
        './lib/history.min.js', './lib/axios.min.js'
    ], _outerCDN = [
        'https://cdn.bootcss.com/react/16.2.0/umd/react.production.min.js',
        'https://cdn.bootcss.com/react-dom/16.2.0/umd/react-dom.production.min.js',
        'https://cdn.bootcss.com/redux/3.7.2/redux.min.js',
        'https://cdn.bootcss.com/react-redux/5.0.7/react-redux.min.js',
        'https://cdn.bootcss.com/react-router-dom/4.2.2/react-router-dom.min.js',
        'https://cdn.bootcss.com/history/4.7.2/history.min.js',
        'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    ];

    apps.forEach(app => app.compiled && (compiledSize += 1));
    apps.forEach((app) => {
        if(!app.compiled) return; // 判断是否加入编译,如果app还未开发好,就设置为false
        app.css = app.css || [];
        app.window = app.window || {};
        app.window.mock = (app.window.mock && utils.getEnv().env === 'development') || app.window.forceMock;
        let htmlPage = {
            template: './config/template.html',
            filename: `${app.id}.html`,
            inject: utils.getEnv().env === 'development', // 使用自动插入JS脚本
            hash: false, // 为js脚本资源生成hash值，这里设置false，hash交由打包时候根据环境设置
            minify: { //压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: false, // 删除空白符与换行符
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            chunks: [app.id],
            title: app.title || 'M6 - Base',
            favicon: app.favicon,
            env: utils.getEnv().env, // 添加环境说明
            loadImage: app.loadImage || (app.window && app.window.loadImage),
            BCFG: JSON.stringify({
                id: app.id,
                env: utils.getEnv(), // 添加环境说明
                version: app.version || 0,
                css: app.css.concat(`./css/${app.id}-runtime.css`),
                basedOn: app.local ? _localCDN : _outerCDN,
                globalCDN: (app.globalCDN || []).concat(app.window.mock ? './lib/mock.min.js' : []),
                dependOn: compiledSize > 1 ?
                    [`./lib/${MXENV.library.m6}-${process.env.npm_package_version}.min.js`, './js/vendor.chunk.js', `./js/${app.id}.js`] :
                    [`./lib/${MXENV.library.m6}-${process.env.npm_package_version}.min.js`, `./js/${app.id}.js`],
                window: app.window,
            }),
        };
        htmlPages.push(htmlPage);
    });
    return htmlPages;
};

/**
 * 设置开发模式下的工具
 * @returns {*}
 */
exports.getDevtool = () => {
    if(utils.getEnv().env === 'development'){ // 开发模式
        return 'cheap-module-eval-source-map'; // '#eval'; // '#cheap-module-eval-source-map';
    }else{ // 生产模式
        return false; // '#eval';
    }
};