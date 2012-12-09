define(
    [
        'backbone',
        'jquery',
        'views/Repo',
        'collections/Repo',
        'views/Index'
    ],
    function (Backbone, $, RepoView, RepoCollection, IndexView) {
        "use strict";

        return new (Backbone.Router.extend({

            routes: {
                '': 'index',
                ':username': 'watch'
            },

            index: function () {
                var indexView = new IndexView({
                    router: this
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
                    repoCollection: repoCollection
                });

                repoView.render();
                $('.main').html(repoView.el);

                repoView.autoFetch();
            }
        }))();
    }
);
