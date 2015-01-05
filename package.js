Package.describe({
  summary: 'Style with attitude.',
  version: "1.1.4",
  git: "https://github.com/fightingtheboss/meteor-scss.git"
});

Package._transitional_registerBuildPlugin({
  name: 'fightingtheboss:scss',
  sources: [
    'plugin/compile-scss.js'
  ],
  npmDependencies: {
    'node-sass': '1.1.4',
    'lodash': '2.4.1'
  }
});

Package.on_test(function (api) {
  api.use(['test-helpers',
           'tinytest',
           'jquery',
           'templating']);
  api.use(['fightingtheboss:scss']);
  api.add_files(['test/scss_tests.html', 'test/scss_tests.js'], 'client');
  api.add_files(['test/scss_tests.scss'], 'client',  {isTest:true});
});
