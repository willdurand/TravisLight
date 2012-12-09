define(
    [
        'backbone',
        'jquery',
        'views/Repo',
        'collections/Repo'
    ],
    function (Backbone, $, RepoView, RepoCollection) {
        "use strict";

        return new (Backbone.Router.extend({

            routes: {
                '': 'index',
                ':username': 'watch'
            },

            index: function () {
                this.watch('willdurand');
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
