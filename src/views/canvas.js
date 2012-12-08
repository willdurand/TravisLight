define(
    [
        'text!templates/canvas.html',
        'underscore',
        'backbone'
    ],
    function (template, _, Backbone) {
        "use strict";

        return new (Backbone.View.extend({
            template: _.template(template),

            render: function () {
                this.$el.html(this.template());
            }
        }))();
    }
);
