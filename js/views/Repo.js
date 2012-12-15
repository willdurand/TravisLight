/*global window: true */
define(
    [
        'text!templates/repoList.html',
        'underscore',
        'jquery',
        'backbone',
        'config'
    ],
    function (template, _, $, Backbone, config) {
        "use strict";

        return Backbone.View.extend({
            tagName: 'ul',
            className: 'repos unstyled',
            template: _.template(template),

            initialize: function (options) {
                this.repoCollection = options.repoCollection;
                this.ventilator = options.ventilator;
            },

            render: function () {
                $('body').addClass('loading');

                this.$el.html(this.template({
                    collection: this.repoCollection.presenter()
                }));
            },

            autoFetch: function () {
                var repoView = this;

                if (false === $(this.el).is(':visible')) {
                    $('body').removeClass('loading');

                    return;
                }

                this.repoCollection.fetch().done(function () {
                    $('body').removeClass('loading');

                    if (0 === repoView.repoCollection.length) {
                        repoView.ventilator.trigger('navigate:index');
                        repoView.ventilator.trigger(
                            'canvas:message:error',
                            "Can't find any repositories for the given user, sorry."
                        );

                        return;
                    }

                    repoView.render();

                    window.setTimeout(function () {
                        repoView.autoFetch();
                    }, config.refreshTime);
                });
            }
        });
    }
);
