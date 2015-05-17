define(
    [
        'jquery',
        'backbone',
        'underscore',
        'moment'
    ],
    function ($, Backbone, _, moment) {
        "use strict";

        return Backbone.Model.extend({

            STATUS_PASSED: 'passed',
            STATUS_FAILED: 'failed',
            STATUS_BUILDING: 'building',
            STATUS_UNKNOWN: 'unknown',

            isFetchingGithubData: false,

            url: function () {
                var base = $('body').data('api-url') + '/repos';

                return this.isNew() ? base : base + '/' + this.id;
            },

            fetchGitHubData: function () {
                if (this.get('last_release_tag_name') || this.isFetchingGithubData || !this.get('github_access_token')) {
                    return;
                }

                this.isFetchingGithubData = true;

                var repo = this;

                $.getJSON('https://api.github.com/repos/' + this.get('slug') + '/releases?access_token=' + this.get('github_access_token'))
                .done(function (releases) {

                    if (undefined !== releases[0]) {
                        repo.set('last_release_tag_name', releases[0].tag_name);
                        repo.set('last_release_html_url', releases[0].html_url);
                        repo.set('last_release_published_at', releases[0].published_at);
                    }
                }).always(function () {
                    repo.isFetchingGithubData = false;
                });

                $.getJSON('https://api.github.com/repos/' + this.get('slug') + '?access_token=' + this.get('github_access_token'))
                .done(function (repoInfo) {
                    repo.set('open_issues_count', repoInfo.open_issues_count);
                });
            },

            presenter: function () {
                return _.extend(this.toJSON(), {
                    status: this.getStatus(),
                    travisUrl: this.getTravisUrl(),
                    githubUrl: this.getGithubUrl(),
                    lastBuildFinishedAt: this.getLastBuildFinishedAt(),
                    humanizedLastBuildFinishedAt: this.getHumanizedBuildFinishedAt(),
                    lastReleaseTagName: this.getLastReleaseTagName(),
                    lastReleaseUrl: this.getLastReleaseUrl(),
                    lastReleasePublishedAt: this.getLastReleasePublishedAt(),
                    nbOpenIssues: this.getNbOpenIssues()
                });
            },

            getStatus: function () {
                if (null !== this.getLastBuildStartedAt() &&
                    null === this.getLastBuildFinishedAt()) {
                    return this.STATUS_BUILDING;
                }

                if ('created' === this.get('last_build_state') || 'started' === this.get('last_build_state')) {
                    return this.STATUS_BUILDING;
                }

                if ('passed' === this.get('last_build_state')) {
                    return this.STATUS_PASSED;
                } else if ('errored' === this.get('last_build_state') || 'failed' === this.get('last_build_state')) {
                    return this.STATUS_FAILED;
                }

                return this.STATUS_UNKNOWN;
            },

            getTravisUrl: function () {
                return 'https://travis-ci.org/' + this.get('slug') + '/builds/' + this.get('last_build_id');
            },

            getGithubUrl: function () {
                return 'https://github.com/' + this.get('slug');
            },

            getLastBuildStartedAt: function () {
                return this.get('last_build_started_at');
            },

            getLastBuildFinishedAt: function () {
                return this.get('last_build_finished_at');
            },

            getHumanizedBuildFinishedAt: function () {
                if (this.getLastBuildFinishedAt()) {
                    return moment(this.getLastBuildFinishedAt()).fromNow();
                }

                return '';
            },

            getLastReleaseTagName: function () {
                this.fetchGitHubData();

                return this.get('last_release_tag_name');
            },

            getLastReleaseUrl: function () {
                this.fetchGitHubData();

                return this.get('last_release_html_url');
            },

            getLastReleasePublishedAt: function () {
                this.fetchGitHubData();

                if (this.get('last_release_published_at')) {
                    return moment(this.get('last_release_published_at')).fromNow();
                }

                return 'n/a';
            },

            getNbOpenIssues: function () {
                this.fetchGitHubData();

                return undefined !== this.get('open_issues_count') ? this.get('open_issues_count') : 0;
            },

            isFailed: function () {
                return this.STATUS_FAILED === this.getStatus();
            },

            getRank: function () {
                switch (this.getStatus()) {
                    case this.STATUS_PASSED:
                        return 4;

                    case this.STATUS_FAILED:
                        return 2;

                    case this.STATUS_BUILDING:
                        return 1;

                    default:
                        return 3;
                }
            }
        });
    }
);
