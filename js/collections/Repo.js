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
                switch (repoModel.getStatus()) {
                    case repoModel.STATUS_PASSED:
                        return 4;

                    case repoModel.STATUS_FAILED:
                        return 2;

                    case repoModel.STATUS_BUILDING:
                        return 1;

                    default:
                        return 3;
                }
            },

            getNbFailed: function () {
                return this.filter(function (repoModel) {
                    return repoModel.isFailed();
                }).length;
            }
        });
    }
);
