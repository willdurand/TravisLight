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
                    status: this.getStatus()
                });
            },

            getStatus: function () {
                var lastBuildStatus = this.get('last_build_status');

                if (0 === lastBuildStatus) {
                    return 'pass';
                } else if (1 === lastBuildStatus) {
                    return 'fail';
                }

                return 'unknown';
            }
        });
    }
);
