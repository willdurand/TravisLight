define(
    [
        'models/Repo'
    ],
    function (RepoModel) {
        "use script";

        var repo = new RepoModel();

        describe('models/Repo', function () {
            it('should be an instance of Backbone.Model', function () {
                expect(repo).to.be.an.instanceOf(Backbone.Model);
            });

            it('should have a presenter() method', function () {
                expect(repo).to.respondTo('presenter');
            });

            describe('presenter()', function () {
                it('should contain a status', function () {
                    expect(repo.presenter()).to.include.key('status');
                });

                it('should contain a travis url', function () {
                    expect(repo.presenter()).to.include.key('travisUrl');
                });

                it('should contain a github url', function () {
                    expect(repo.presenter()).to.include.key('githubUrl');
                });

                it('should contain a last build (finishedAt) date', function () {
                    expect(repo.presenter()).to.include.key('lastBuildFinishedAt');
                });

                it('should contain a humanized last build (finishedAt) date', function () {
                    expect(repo.presenter()).to.include.key('humanizedLastBuildFinishedAt');
                });
            });

            it('should have a getStatus() method', function () {
                expect(repo).to.respondTo('getStatus');
            });

            describe('getStatus()', function (){
                it('should return "unknown" by default', function () {
                    expect(repo.getStatus()).to.equal(repo.STATUS_UNKNOWN);
                    expect(repo.isFailed()).to.be.equal(false);
                });

                it('should return "passed" with last_build_result = 0', function () {
                    repo.set('last_build_result', 0);
                    expect(repo.getStatus()).to.equal(repo.STATUS_PASSED);
                    expect(repo.isFailed()).to.be.equal(false);
                });

                it('should return "failed" with last_build_result = 1', function () {
                    repo.set('last_build_result', 1);
                    expect(repo.getStatus()).to.equal(repo.STATUS_FAILED);
                    expect(repo.isFailed()).to.be.equal(true);
                });

                it('should return "building" with a last build startedAt date and no last build finishedAt date', function () {
                    repo.set('last_build_started_at', new Date());
                    repo.set('last_build_finished_at', null);
                    expect(repo.getStatus()).to.equal(repo.STATUS_BUILDING);
                    expect(repo.isFailed()).to.be.equal(false);
                });
            });
        });
    }
);
