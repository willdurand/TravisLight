define(
    [
        'jquery',
        'backbone',
        'underscore',
        'moment'
    ],
    function ($, Backbone, _, moment) {
        "use strict";

        return Backbone.Model.extend({

            url : function() {
                var base = $('body').data('api-url') + '/repos';

                return this.isNew() ? base : base + '/' + this.id;
            },

            presenter: function () {
                return _.extend(this.toJSON(), {
                    status: this.getStatus(),
                    travisUrl: this.getTravisUrl(),
                    githubUrl: this.getGithubUrl(),
                    lastBuildFinishedAt: this.getLastBuildFinishedAt(),
                    humanizedLastBuildFinishedAt: this.getHumanizedBuildFinishedAt()
                });
            },

            getStatus: function () {
                var lastBuildStatus = this.get('last_build_result');

                if (0 === lastBuildStatus) {
                    return 'passing';
                } else if (1 === lastBuildStatus) {
                    return 'failing';
                }

                return 'unknown';
            },

            getTravisUrl: function () {
                return 'https://travis-ci.org/' + this.get('slug') + '/builds/' + this.get('last_build_id');
            },

            getGithubUrl: function () {
                return 'https://github.com/' + this.get('slug');
            },

            getLastBuildFinishedAt: function () {
                return this.get('last_build_finished_at');
            },

            getHumanizedBuildFinishedAt: function () {
                if (this.getLastBuildFinishedAt()) {
                    return moment(this.getLastBuildFinishedAt()).fromNow();
                }

                return '';
            }
        });
    }
);
