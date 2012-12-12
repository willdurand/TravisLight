TravisLight
===========

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

Type `f` to enter full screen mode if your browser supports this feature.


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

Alternatively, you can use the PHP built-in webserver:

    php -S localhost:8000

Browse the application at: http://locahost:8000/.


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
