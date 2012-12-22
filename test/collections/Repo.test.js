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

            describe('comparator()', function () {
                it('should return 3 by default', function () {
                    expect(repo.comparator(new RepoModel())).to.equal(3);
                });
            });
        });
    }
);
