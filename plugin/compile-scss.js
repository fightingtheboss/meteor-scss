var path = Npm.require('path');
var sass = Npm.require('node-sass');
var fs = Npm.require('fs');
var _ = Npm.require('lodash');

var loadJSONFile = function (filePath) {
  var content = fs.readFileSync(filePath);

  try {
    return JSON.parse(content);
  } catch (e) {
    console.log("Error: failed to parse ", filePath, " as JSON");
    return {};
  }
};

var sourceHandler = function(compileStep) {
  // Return if it's a partial, we don't want to output those as css files.
  if (path.basename(compileStep.inputPath)[0] === '_') return;
  // XXX annoying that this is replicated in .css, .less, and .styl

  var optionsFile = path.join(process.cwd(), 'scss.json');
  var scssOptions = {};

  if ( fs.existsSync(optionsFile) ) {
    scssOptions = loadJSONFile(optionsFile);
  }

  var options = _.extend({}, scssOptions, {
    sourceMap:         true,
    sourceMapEmbed:    true,
    sourceMapContents: true,
    outputStyle:       'compressed',
  });

  options.file = compileStep.fullInputPath;

  if ( !_.isArray(options.includePaths) ) {
    options.includePaths = [options.includePaths];
  }

  options.includePaths.push(path.dirname(compileStep.fullInputPath));


  try {
    var css = sass.renderSync(options);
  } catch (e) {
    // less.render() is supposed to report any errors via its
    // callback. But sometimes, it throws them instead. This is
    // probably a bug in less. Be prepared for either behavior.
    compileStep.error({
      message: e,
      sourcePath: e.filename || compileStep.inputPath,
      line: e.line - 1,  // dunno why, but it matches
      column: e.column + 1
    });

    return;
  }

  compileStep.addStylesheet({
    path: compileStep.inputPath + ".css",
    data: css
  });
}

Plugin.registerSourceHandler("scss", {archMatching: 'web'}, sourceHandler);
Plugin.registerSourceHandler("sass", {archMatching: 'web'}, sourceHandler);

Plugin.registerSourceHandler("import.scss", function () {
  // Do nothing
});
