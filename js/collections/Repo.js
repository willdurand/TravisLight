define(
    [
        'models/Repo',
        'underscore',
        'jquery',
        'backbone'
    ],
    function (RepoModel, _, $, Backbone) {
        "use strict";

        return Backbone.Collection.extend({
            model: RepoModel,

            initialize: function (models, options) {
                this.username = options.username;
                this.url      = $('body').data('api-url') + '/repos?member=' + this.username;
            },

            presenter: function () {
                return _.map(this.models, function (model) {
                    return model.presenter();
                });
            },

            comparator: function (repoModel) {
                return repoModel.getStatus();
            }
        });
    }
);
