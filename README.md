TravisLight
===========

TravisLight is a build monitoring tool that allows you to quickly detect
failing projects hosted on [GitHub](http://github.com) and tested using
[Travis CI](https://travis-ci.org/) by providing a nice web interface.

This application has been written using [Backbone.js](http://backbonejs.org/),
[RequireJS](http://requirejs.org/), [Moment.js](http://momentjs.com/), and
[Lo Dash](http://lodash.com/).


Installation
------------

Install dependencies using [Bower](http://twitter.github.com/bower/):

    bower install

You're done! All you need is a webserver to run the application.

You can use the PHP built-in webserver:

    php -S localhost:8000

Alternatively, you can use [Node.js](http://nodejs.org/). First, install
[Connect](http://www.senchalabs.org/connect/):

    npm install connect

Now, start the webserver:

    node server.js

Browse the application at: http://locahost:8000/.


Screenshots
-----------

A picture is worth a thousand words, so here are a few screenshots:

![](https://raw.github.com/willdurand/TravisLight/master/doc/index.png)

![](https://raw.github.com/willdurand/TravisLight/master/doc/repos.png)


License
-------

TravisLight is released under the MIT License. See the bundled LICENSE file
for details.
