Package.describe({
  summary: 'Latest stable node-sass wrapped to work with Meteor.',
  version: "1.1.4",
  git: "https://github.com/fightingtheboss/meteor-scss.git"
});

Package.registerBuildPlugin({
  name: 'compileScss',
  sources: [
    'plugin/compile-scss.js'
  ],
  npmDependencies: {
    'node-sass': '1.1.4',
    'lodash': '2.4.1'
  }
});

Package.onTest(function (api) {
  api.use(['test-helpers',
           'tinytest',
           'jquery',
           'templating']);
  api.use(['meteor-scss']);
  api.add_files(['test/scss_tests.html', 'test/scss_tests.js'], 'client');
  api.add_files(['test/scss_tests.scss'], 'client',  {isTest:true});
});
