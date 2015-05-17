/*global window: true */
define(
    [
        'text!templates/repoList.html',
        'underscore',
        'jquery',
        'backbone',
        'config',
        'tinycon'
    ],
    function (template, _, $, Backbone, config, Tinycon) {
        "use strict";

        return Backbone.View.extend({
            tagName: 'table',
            className: 'repos',
            template: _.template(template),

            initialize: function (options) {
                this.repoCollection = options.repoCollection;

                $('body').addClass('loading');
            },

            render: function () {
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

                $('body').addClass('loading');

                this.repoCollection.fetch().done(function () {
                    $('body').removeClass('loading');

                    if (0 === repoView.repoCollection.length) {
                        Backbone.trigger('navigate:index');
                        Backbone.trigger(
                            'canvas:message:error',
                            "Can't find any repositories for the given user, sorry."
                        );

                        return;
                    }

                    repoView.render();
                    repoView.updateFavicon();

                    window.setTimeout(function () {
                        repoView.autoFetch();
                    }, config.refreshTime);
                });
            },

            updateFavicon: function () {
                var nbFailed = this.repoCollection.getNbFailed();

                Tinycon.setBubble(nbFailed);
            }
        });
    }
);
