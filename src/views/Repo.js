define(
    [
        'text!templates/repoList.html',
        'underscore',
        'jquery',
        'backbone'
    ],
    function (template, _, $, Backbone) {
        "use strict";

        return Backbone.View.extend({
            template: _.template(template),

            initialize: function (options) {
                this.repoCollection = options.repoCollection;
            },

            render: function () {
                this.$el.html(this.template({
                    collection: this.repoCollection.presenter()
                }));
            }
        });
    }
);
