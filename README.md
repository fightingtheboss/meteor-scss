meteor-scss
===========

Latest stable node-sass wrapped to work with Meteor.

This allows .scss and .sass files to work with Meteor.

## Note on node-sass versions

This is based on [fourseven:scss](https://github.com/fourseven/meteor-scss). To be able to use current versions of Bourbon and Neat I needed to track with the latest stable node-sass to take advantage of libsass 3.x, which has been aggressively moving to parity with Ruby Sass.

To accomplish this I've removed the Autoprefixer dependency to keep things simple and am now running the latest stable release (1.1.4) that is confirmed to work with Bourbon (4.0.2) and Neat (1.7). I will do my best to keep this package updated with the latest stable version of node-sass that works with current releases of Bourbon and Neat, which I believe are good compatibility benchmarks for other Sass libraries.

I include Bourbon and Neat using [meteor-bower](https://github.com/mquandalle/meteor-bower/) as described in the [Configuration]() section.


## Usage

This package is configured to find *.scss *.sass files and compile them through node-sass and provide them to the page. So just start using it, the scss files can be anywhere in the project.

To use `@import` statements within your project, simply use the Sass partial naming convention of prefixing your filename with an underscore (e.g. _partial.scss) or using the Meteor convention of adding the extension `.import.scss`.


## Configuration

Add a `scss.json` file at the project's root to pass configuration options to node-sass. See [node-sass](https://github.com/sass/node-sass)'s documentation for a list of options.

Example (for using bourbon and neat with meteor-bower):

```json
{
  "includePaths": [
    ".meteor/local/bower",
    ".meteor/local/bower/bourbon/dist",
    ".meteor/local/bower/neat/app/assets/stylesheets"
  ]
}
```


## LibSass vs Ruby Sass

Please note that this project uses LibSass. As such some features are not implemented compared to the Ruby version/implementation. Things are improving, so please be patient. Before you ask, I have no intention of making a version of this package that links to the Ruby version instead.


## Heroku

If you're having problems running this on Heroku please use the cedar-14 stack, by typing the following `heroku stack:set cedar-14` - see [#41](https://github.com/fourseven/meteor-scss/issues/41) for more information.
