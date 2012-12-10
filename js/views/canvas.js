/*globals window: true */
define(
    [
        'text!templates/canvas.html',
        'underscore',
        'backbone',
        'jquery',
        'ventilator'
    ],
    function (template, _, Backbone, $, ventilator) {
        "use strict";

        return new (Backbone.View.extend({
            tagName: 'div',
            className: 'container-fluid',
            template: _.template(template),
            messageTemplate: _.template($(template).filter('#message').html()),

            initialize: function () {
                ventilator.on('canvas:message:notice', function (message) {
                    this.addMessage(message, 'info');
                }, this);

                ventilator.on('canvas:message:error', function (message) {
                    this.addMessage(message, 'error');
                }, this);
            },

            render: function () {
                this.$el.html(this.template());
            },

            addMessage: function (message, level) {
                var $message = $(this.messageTemplate({
                    message: message,
                    level: level
                }));

                $('.messages').append($message);

                window.setTimeout(function() {
                    $message.remove();
                }, 3000);
            }
        }))();
    }
);
