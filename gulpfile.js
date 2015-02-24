require('shared-sofa-component-tasks')(require('gulp'), {
    pkg: require('./package.json'),
    baseDir: __dirname,
    testDependencyFiles: [
        'node_modules/angular-sofa-locale-service/dist/sofaLocaleService.js'
    ]
});
