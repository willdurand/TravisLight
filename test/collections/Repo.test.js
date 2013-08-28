define(
    [
        'collections/Repo',
        'models/Repo'
    ],
    function (RepoCollection, RepoModel) {
        "use script";

        var repo = new RepoCollection(null, {
            username: 'foo'
        });

        describe('collections/Repo', function () {
            it('should be an instance of Backbone.Collection', function () {
                expect(repo).to.be.an.instanceOf(Backbone.Collection);
            });

            it('should have a presenter() method', function () {
                expect(repo).to.respondTo('presenter');
            });

            it('should sort elements by their rank', function () {
                var result;

                repo.add(new RepoModel({
                    id: 'passed',
                    last_build_result: 0
                }));

                repo.add(new RepoModel({
                    id: 'failed',
                    last_build_result: 1
                }));

                repo.add(new RepoModel({
                    id: 'building',
                    last_build_started_at: new Date(),
                    last_build_finished_at: null
                }));

                repo.sort();
                result = repo.presenter();

                console.log(result);

                expect(result[0].id).to.equal('building');
                expect(result[1].id).to.equal('failed');
                expect(result[2].id).to.equal('passed');
            });
        });
    }
);
