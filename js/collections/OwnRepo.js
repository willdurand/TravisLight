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
                this.url = $('body').data('api-url') + '/repos?owner_name=' + options.username;
                this.githubAccessToken = options.github_access_token;
            },

            sync: function (method, collection, options) {
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/vnd.travis-ci.2+json');
                };

                return Backbone.sync(method, collection, options);
            },

            parse: function (response) {
                var collection = this;

                return _.map(
                    _.filter(response.repos, function (repo) {
                        return true === repo.active;
                    }),
                    function (repo) {
                        _.extend(repo, { 'github_access_token': collection.githubAccessToken });

                        return repo;
                    }
                );
            }
        });
    }
);
