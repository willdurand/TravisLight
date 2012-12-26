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

            STATUS_PASSED: 'passed',
            STATUS_FAILED: 'failed',
            STATUS_BUILDING: 'building',
            STATUS_UNKNOWN: 'unknown',

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
                if (null !== this.getLastBuildStartedAt() &&
                    null === this.getLastBuildFinishedAt()) {
                    return this.STATUS_BUILDING;
                }

                if (0 === this.get('last_build_result')) {
                    return this.STATUS_PASSED;
                } else if (1 === this.get('last_build_result')) {
                    return this.STATUS_FAILED;
                }

                return this.STATUS_UNKNOWN;
            },

            getTravisUrl: function () {
                return 'https://travis-ci.org/' + this.get('slug') + '/builds/' + this.get('last_build_id');
            },

            getGithubUrl: function () {
                return 'https://github.com/' + this.get('slug');
            },

            getLastBuildStartedAt: function () {
                return this.get('last_build_started_at');
            },

            getLastBuildFinishedAt: function () {
                return this.get('last_build_finished_at');
            },

            getHumanizedBuildFinishedAt: function () {
                if (this.getLastBuildFinishedAt()) {
                    return moment(this.getLastBuildFinishedAt()).fromNow();
                }

                return '';
            },

            isFailed: function () {
                return this.STATUS_FAILED === this.getStatus();
            },

            getRank: function () {
                switch (this.getStatus()) {
                    case this.STATUS_PASSED:
                        return 4;

                    case this.STATUS_FAILED:
                        return 2;

                    case this.STATUS_BUILDING:
                        return 1;

                    default:
                        return 3;
                }
            }
        });
    }
);
