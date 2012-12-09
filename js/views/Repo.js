/*global window: true */
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
            tagName: 'ul',
            className: 'repos unstyled',
            template: _.template(template),

            initialize: function (options) {
                this.repoCollection = options.repoCollection;
            },

            render: function () {
                this.$el.html(this.template({
                    collection: this.repoCollection.presenter()
                }));
            },

            autoFetch: function () {
                var that = this;

                this.repoCollection.fetch().done(function () {
                    that.render();

                    window.setTimeout(function () {
                        that.autoFetch();
                    }, 5000);
                });
            }
        });
    }
);
