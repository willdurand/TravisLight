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

            initialize: function (models, options) {
                this.collections = options.collections;
            },

            fetch: function () {
                var mainCollection = this;

                return $.when
                    .apply($, _.map(this.collections, function (collection) {
                        return collection.fetch().done(function () {
                            mainCollection.add(collection.models);
                        });
                    }));
            },

            presenter: function () {
                return _.map(this.models, function (model) {
                    return model.presenter();
                });
            },

            comparator: function (repoModel) {
                var result = repoModel.getRank() * 100000000000;

                if (null !== repoModel.getLastBuildFinishedAt()) {
                    result = result - moment(repoModel.getLastBuildFinishedAt());
                } else {
                    result = result - moment(repoModel.getLastBuildStartedAt());
                }

                return result;
            },

            getNbFailed: function () {
                return this.filter(function (repoModel) {
                    return repoModel.isFailed();
                }).length;
            }
        });
    }
);
