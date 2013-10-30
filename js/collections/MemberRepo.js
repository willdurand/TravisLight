define(
    [
        'models/Repo',
        'underscore',
        'jquery',
        'backbone',
        'moment'
    ],
    function (RepoModel, _, $, Backbone, moment) {
        "use strict";

        return Backbone.Collection.extend({
            model: RepoModel,

            initialize: function (options) {
                this.url = $('body').data('api-url') + '/repos?member=' + options.username;
            }
        });
    }
);
