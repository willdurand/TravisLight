define(
    [
        'config'
    ],
    function (config) {
        "use script";

        describe('config', function () {
            it('should be an object', function () {
                expect(config).to.be.an('object');
            });

            it ('should contain a refresh time', function () {
                expect(config.refreshTime).to.exist;
            });
        });
    }
);
