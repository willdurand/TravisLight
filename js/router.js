define(
    [
        'backbone',
        'jquery',
        'ventilator',
        'views/Repo',
        'collections/Repo',
        'views/Index'
    ],
    function (Backbone, $, ventilator, RepoView, RepoCollection, IndexView) {
        "use strict";

        return new (Backbone.Router.extend({

            routes: {
                '': 'index',
                ':username': 'watch'
            },

            initialize: function () {
                ventilator.on('navigate:index', function () {
                    this.navigate('', { trigger: true });
                }, this);

                ventilator.on('navigate:watch', function (username) {
                    this.navigate('/' + username, { trigger: true });
                }, this);
            },

            index: function () {
                var indexView = new IndexView({
                    ventilator: ventilator
                });

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
                    ventilator: ventilator,
                    repoCollection: repoCollection
                });

                repoView.render();
                $('.main').html(repoView.el);

                repoView.autoFetch();
            }
        }))();
    }
);
