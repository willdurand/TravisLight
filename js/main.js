require({
    deps: [
        'bootstrap'
    ],

    paths: {
        'backbone': '../bower_components/backbone/backbone-min',
        'jquery': '../bower_components/jquery/jquery',
        'underscore': '../bower_components/lodash/lodash.min',
        'text': '../bower_components/requirejs-text/text',
        'moment': '../bower_components/moment/moment',
        'bootstrap': 'libs/bootstrap.min',
        'key': '../bower_components/keymaster/keymaster',
        'screenfull': '../bower_components/screenfull/dist/screenfull.min',
        'tinycon': '../bower_components/tinycon/tinycon.min'
    },

    shim: {
        'bootstrap': {
            'deps': [ 'jquery' ]
        },
        'backbone': {
            'deps': [ 'underscore', 'jquery' ],
            'exports': 'Backbone'
        },
        'key': {
            'exports': 'key'
        },
        'screenfull': {
            'exports': 'screenfull'
        },
        'tinycon': {
            'exports': 'Tinycon'
        }
    }
});

require(
    [
        'router',
        'views/canvas',
        'jquery',
        'backbone',
        'tinycon'
    ],
    function (router, canvasView, $, Backbone, Tinycon) {
        "use strict";

        Tinycon.setOptions({
            background: '#ff3019'
        });

        canvasView.render();
        $('body').prepend(canvasView.el);

        Backbone.history.start();
    }
);
