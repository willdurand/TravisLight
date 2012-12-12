require({
    deps: [
        'bootstrap'
    ],

    paths: {
        'backbone': '../components/backbone/backbone-min',
        'jquery': '../components/jquery/jquery',
        'underscore': '../components/lodash/lodash.min',
        'text': '../components/requirejs-text/text',
        'moment': '../components/moment/moment',
        'bootstrap': 'libs/bootstrap.min',
        'key': '../components/keymaster/keymaster.min',
        'screenfull': '../components/screenfull/dist/screenfull.min'
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
        }
    }
});

require(
    [
        'router',
        'views/canvas',
        'jquery',
        'backbone'
    ],
    function (router, canvasView, $, Backbone) {
        "use strict";

        canvasView.render();
        $('body').prepend(canvasView.el);

        Backbone.history.start();
    }
);
