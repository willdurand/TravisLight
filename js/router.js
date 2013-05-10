define(
    [
        'backbone',
        'jquery',
        'key',
        'screenfull',
        'views/Repo',
        'collections/Repo',
        'views/Index'
    ],
    function (Backbone, $, key, screenfull, RepoView, RepoCollection, IndexView) {
        "use strict";

        return new (Backbone.Router.extend({

            routes: {
                '': 'index',
                ':username': 'watch'
            },

            initialize: function () {
                key('f', function () {
                    if (screenfull.enabled) {
                        screenfull.request();
                    }
                });

                Backbone.on('navigate:index', function () {
                    this.navigate('', { trigger: true });
                }, this);

                Backbone.on('navigate:watch', function (username) {
                    this.navigate('/' + username, { trigger: true });
                }, this);
            },

            index: function () {
                var indexView = new IndexView();

                indexView.render();
                $('.main').html(indexView.el);
            },

            watch: function (username) {
                var repoView,
                    repoCollection;

                repoCollection = new RepoCollection(null, {
                    username: username
                });
                repoView = new RepoView({
                    repoCollection: repoCollection
                });

                repoView.render();
                $('.main').html(repoView.el);

                repoView.autoFetch();
            }
        }))();
    }
);
