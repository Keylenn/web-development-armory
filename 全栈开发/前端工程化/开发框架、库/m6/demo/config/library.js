/**
 * 独立依赖组件库，单独打包，自动注入到html文件(排在业务js文件之前)
 * Created by xiechunming on 2017/07/06.
 */

const path = require('path'); // 加载Node的Path模块

module.exports = {
    // 基础级依赖基础组件库，单独打包成js的本地业务插件库，这里有基本依赖的排序
    base: {
        'prop-types': 'prop-types',
    },
    // 生产模式打包
    common: {
        'react': 'React',
        'redux': 'Redux',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM',
        'react-redux': 'ReactRedux',
        'history': 'History',
        'axios': 'axios',
    },
    // 放在node_modules下的library打包
    runtime: {
        'prop-types': 'prop-types',
        'react': 'react',
        'redux': 'redux',
        'react-dom': 'react-dom',
        'react-router-dom': 'react-router-dom',
        'react-redux': 'react-redux',
        'history': 'history',
        'axios': 'axios',
    },
    m6: {
        'm6-core': 'window.M6Core',
        // 3.3版本前兼容
        'm6-core/Prototype': 'window.M6Core.Utils.Prototype',
        'm6-core/Dom': 'window.M6Core.Dom',
        'm6-core/Utils': 'window.M6Core.Utils',
        'm6-core/Event': 'window.M6Core.Event',
        'm6-core/Broadcast': 'window.M6Core.Utils.Broadcast',
        'm6-core/Network': 'window.M6Core.Utils.Network',
        'm6-core/Matches': 'window.M6Core.Matches', // 已经过期
        'm6-core/Storage': 'window.M6Core.Utils.Storage',
        'm6-core/Basic': 'window.M6Core.Utils.Basic',
        'm6-core/Redux': 'window.M6Core.Redux',
        'm6-core/Router': 'window.M6Core.Router',
        'm6-core/Components': 'window.M6Core.Components',
        'm6-core/View': 'window.M6Core.View',
        'm6-core/Controller': 'window.M6Core.Controller',
        'm6-core/Provider': 'window.M6Core.Provider',
        'm6-core/Popup': 'window.M6Core.Utils.Popup',
        'm6-core/Service': 'window.M6Core.Utils.Service',
    }
};