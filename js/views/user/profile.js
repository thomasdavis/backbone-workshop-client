define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'mustache',
  'models/session',
  'text!templates/user/profile.html',
  'models/user',
  'views/comments/widget'
], function($, _, Backbone, Vm, Mustache, Session, profileTemplate, UserModel, CommentWidget){
  var ProfileView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      var that = this;
      var userModel = new UserModel({username: this.options.username});
      userModel.fetch({
        success: function (user) {
          that.$el.html(Mustache.render(profileTemplate, {user: user.attributes}));
          var commentWidget = Vm.create(that, 'comments', CommentWidget, {username: that.options.username});
          commentWidget.render();
        }
      })
    }, 
    clean: function () {
    }
  });
  return ProfileView;
});
