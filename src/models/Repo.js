define(
    [
        'jquery',
        'backbone'
    ],
    function ($, Backbone) {
        "use strict";

        return Backbone.Model.extend({

            url : function() {
                var base = $('body').data('api-url') + '/repos';

                return this.isNew() ? base : base + '/' + this.id;
            },

            presenter: function () {
                return this.toJSON();
            }
        });
    }
);
