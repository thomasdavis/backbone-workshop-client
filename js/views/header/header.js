define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'mustache',
  'text!templates/header/layout.html'
], function($, _, Backbone, Session, Mustache, headerLayoutTemplate){
  var HeaderView = Backbone.View.extend({
    el: '.header',
    initialize: function () {
      var that = this;
      Session.on('change:auth', function (session) {
        that.render();
      });
      Session.on('change:errors', function (errors) {
        that.render();
      });
    },
    events: {
      'click .logout': 'logout'
    },
    render: function () {
      this.$el.hide().fadeIn(250);
      console.log('S', Session.attributes);
      this.$el.html(Mustache.render(headerLayoutTemplate, {session: Session.attributes}));
    },
    logout: function () {
      Session.logout(function () {
        Backbone.history.navigate('', {trigger: true});
      });
      return false;
    }
  });
  return HeaderView;
});
