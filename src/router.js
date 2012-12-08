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
                '': 'all'
            },

            all: function () {
                var repoView,
                    repoCollection;

                repoCollection = new RepoCollection();
                repoView = new RepoView({
                    repoCollection: repoCollection
                });

                repoView.render();
                $('.main').html(repoView.el);

                repoCollection.fetch().done(function () {
                    repoView.render();
                });
            }
        }))();
    }
);
