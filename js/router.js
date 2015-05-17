define(
    [
        'backbone',
        'jquery',
        'key',
        'screenfull',
        'views/Repo',
        'collections/Repo',
        'collections/MemberRepo',
        'collections/OwnRepo',
        'views/Index'
    ],
    function (Backbone, $, key, screenfull, RepoView, RepoCollection, MemberRepoCollection, OwnRepoCollection, IndexView) {
        "use strict";

        return new (Backbone.Router.extend({

            routes: {
                '': 'index',
                ':username?github_access_token=:github_access_token': 'watch'
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

                Backbone.on('navigate:watch', function (data) {
                    this.navigate(
                        '/' + data.username + '?github_access_token=' + data.github_access_token,
                        { trigger: true }
                    );
                }, this);
            },

            index: function () {
                var indexView = new IndexView();

                indexView.render();
                $('.main').html(indexView.el);
            },

            watch: function (username, github_access_token) {
                var repoView,
                    repoCollection;

                var options = {
                    'username': username,
                    'github_access_token': github_access_token
                };

                repoCollection = new RepoCollection(null, {
                    collections: [
                        new MemberRepoCollection(options),
                        new OwnRepoCollection(options)
                    ]
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
