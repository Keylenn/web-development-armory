/**
 * 环境变量配置
 * Created by xiechunming on 2017/04/21.
 */

const path = require('path'); // 加载Node的Path模块

exports.path = {
    src: './src/', // 开发业务代码路径
    lib: './library/',
    libM6: './library/m6/', // m6 core 类库生成路径
};

/** 输出文件夹 */
exports.output = {
    js: 'js/', // 生成JS的目录路径
    css: 'css/', // 生成css的目录路径
    db: 'db/', // 生成db的目录路径
    image: 'image/', // 生成image的目录路径
    font: 'font/',  // 生成font的目录路径,
    mson: 'mson/',  // 生成mson的目录路径,
    lib: 'lib/',  // 生成lib的目录路径,
};

/** 发布环境配置 */
exports.prod = { // 编译打包生成配置
    root: './dist/', // 编译打包生成路径
    public: './', // 编译打包生成路径公共路径
};
/** 内测环境配置 */
exports.build = { // 开发打包生成配置
    root: './build/', // 开发打包生成路径
    public: './', // 编译打包生成路径公共路径
};
/** 开发环境配置 */
exports.dev = { // 开发打包生成配置
    root: './dev/', // 开发打包生成路径
    public: '/', // 编译打包生成路径公共路径，运行在内存，使用虚拟环境
};

/** 最基本依赖类库名称 */
exports.library = {
    m6: 'M6Core',
};