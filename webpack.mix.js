const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'resources', 'js'),
            '@components': path.resolve(__dirname, 'resources', 'js', 'components'),
            '@contexts': path.resolve(__dirname, 'resources', 'js', 'contexts'),
            '@services': path.resolve(__dirname, 'resources', 'js', 'services'),
            '@locales': path.resolve(__dirname, 'resources', 'js', 'locales'),
            '@routes': path.resolve(__dirname, 'resources', 'js', 'routes'),
            '@views': path.resolve(__dirname, 'resources', 'js', 'views'),
            '@variables': path.resolve(__dirname, 'resources', 'js', 'variables'),
            '@css': path.resolve(__dirname, 'resources', 'css'),
        }
    }
});

mix.react('resources/js/index.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
