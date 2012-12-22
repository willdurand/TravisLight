TravisLight
===========

[![Build
Status](https://travis-ci.org/willdurand/TravisLight.png?branch=master)](https://travis-ci.org/willdurand/TravisLight)

TravisLight is a build monitoring tool, also known as buildwall, that
allows you to quickly detect failing projects hosted on
[GitHub](http://github.com) and tested using [Travis CI](https://travis-ci.org/)
by providing a nice web interface.

This application has been written using [Backbone.js](http://backbonejs.org/),
[RequireJS](http://requirejs.org/), [Moment.js](http://momentjs.com/), and
[Lo Dash](http://lodash.com/).


Screenshots
-----------

A picture is worth a thousand words, so here are a few screenshots:

![](https://raw.github.com/willdurand/TravisLight/master/doc/index.png)

![](https://raw.github.com/willdurand/TravisLight/master/doc/repos.png)


Features
--------

#### Fullscreen Mode

Hit `f` to enter full screen mode if your browser supports this feature.

Powered by [screenfull](https://github.com/sindresorhus/screenfull.js).


#### Favicon notification

TravisLight shows the number of failed projects in its favicon if possible:

![](https://raw.github.com/willdurand/TravisLight/master/doc/favicon.png)

Powered by [tinycon](https://github.com/tommoor/tinycon).


Installation
------------

Install dependencies using [npm](https://npmjs.org/):

    npm install

Use [Bower](http://twitter.github.com/bower/) to install browser dependencies:

    export PATH=$PATH:`npm bin`
    bower install

You're done!

All you need is a webserver to run the application:

    npm start

Browse the application at: http://locahost:8000/.


Running the test suite
----------------------

You can run the test suite either by opening the file `test/index.html` in
your favorite browser, or install [PhantomJS](http://phantomjs.org/) and run:

    grunt test


Command Line
------------

This application uses [Grunt.js](http://gruntjs.com/) to provide build tasks.
Package the application using the following command:

    grunt package

It's an alias for the `compile:js` and `compile:css` tasks.


License
-------

TravisLight is released under the MIT License. See the bundled LICENSE file
for details.
