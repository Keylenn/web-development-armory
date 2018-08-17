/**
 * 在m6环境下的动态类库依赖
 * Created by xiechunming on 2017/07/11.
 */

module.exports = (config = {}) => {
    window.M6.BCFG = window.M6.BCFG || window.getBootConfig();
    let urlPrefix = '';
    if(window.location.href.toLowerCase().indexOf('http') === 0){
        if(window.location.href.toLowerCase().indexOf('http://') === 0) urlPrefix = 'http://';
        else if(window.location.href.toLowerCase().indexOf('https://') === 0) urlPrefix = 'https://';
        window.M6.HOST = window.location.href.substring(urlPrefix.length);
        window.M6.HOST = urlPrefix + window.M6.HOST.split('/#')[0];
        window.M6.BCFG.localAPP = false;
    }else if(window.location.href.toLowerCase().indexOf('file') === 0){
        urlPrefix = 'file:///';
        window.M6.HOST = window.location.href.substring(urlPrefix.length);
        window.M6.HOST = urlPrefix + window.M6.HOST.split(`/${window.M6.BCFG.id}.html`)[0];
        window.M6.BCFG.localAPP = true;
    }

    let sysCfg = window.M6.getSysConfig();
    sysCfg.errorAlert = sysCfg.errorAlert === undefined ? !!window.M6.BCFG.window.errorAlert : sysCfg.errorAlert;

    // js函数库配置
    require.context('../../library/base', true, /\.js$/); // 初始化基础函数库
    require.context('../../library/external', true, /\.js/); // 初始化外部函数库
    if(window.M6.BCFG.env.env === 'production' || window.M6.BCFG.env.operation === 'build'){
        require.context('../../library/common', true, /\.js/); // 初始化依赖库
        require(`../../library/m6/M6Core-${window.M6.BCFG.env.version}.min.js`); // 初始化m6函数库
    }else if(window.M6.BCFG.env.env === 'development') {
        sysCfg.errorAlert = true;
    }

    // 主题配置
    require.context('../res/css', true, /\.css$/); // 获取雪碧图样式
    require.context('../res/font'); // 初始化主题字体
    require.context('../res/image', false); // 不包含子目录
    require.context('../res/image/css', false); // 初始化主题相关图片，不包含子目录
    window.M6.setFontSize(sysCfg.fontSize); // 初始化字体大小

    // 保存运行配置
    window.M6.setSysConfig(sysCfg);
};