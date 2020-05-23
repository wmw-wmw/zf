// 配置文件路径别名
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('api', resolve('src/api'))
            .set('assets', resolve('src/assets'))
            .set('base', resolve('src/base'))
            .set('components', resolve('src/components'))
            .set('pages', resolve('src/pages'))
            .set('mock', resolve('src/mock'));
        // 格式.set('', resolve(''))
    }
};
