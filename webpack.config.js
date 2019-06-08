var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    .addEntry('app', './assets/js/app.js')
    .addEntry('product', './vue/components/product.vue')
    .addEntry('new-product', './vue/components/new-product.vue')
    .addEntry('product-list', './vue/components/product-list.vue')

    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableVueLoader()
    .enableSassLoader()
;

module.exports = Encore.getWebpackConfig();
