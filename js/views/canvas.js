define(
    [
        'text!templates/canvas.html',
        'underscore',
        'backbone'
    ],
    function (template, _, Backbone) {
        "use strict";

        return new (Backbone.View.extend({
            tagName: 'div',
            className: 'container-fluid',
            template: _.template(template),

            render: function () {
                this.$el.html(this.template());
            }
        }))();
    }
);
