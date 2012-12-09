define(
    [
        'jquery',
        'backbone',
        'underscore'
    ],
    function ($, Backbone, _) {
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
                    githubUrl: this.getGithubUrl()
                });
            },

            getStatus: function () {
                var lastBuildStatus = this.get('last_build_status');

                if (0 === lastBuildStatus) {
                    return 'passing';
                } else if (1 === lastBuildStatus) {
                    return 'failing';
                }

                return 'unknown';
            },

            getTravisUrl: function () {
                return 'https://travis-ci.org/' + this.get('slug');
            },

            getGithubUrl: function () {
                return 'https://github.com/' + this.get('slug');
            }
        });
    }
);
