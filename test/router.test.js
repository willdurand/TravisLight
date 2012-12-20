define(
    [
        'router'
    ],
    function (router) {
        "use script";

        describe('router', function () {
            it('should be an instance of Backbone.Router', function () {
                expect(router).to.be.an.instanceOf(Backbone.Router);
            });

            it('should have a routes property', function () {
                expect(router.routes).to.be.an('object');
            });
        });
    }
);
