define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'models/session',
  'text!templates/user/profile_edit.html',
  'models/user'
], function($, _, Backbone, Mustache, Session, profileEditTemplate, UserModel){
  var ProfileEditView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    events: {
      'submit form.edit': 'editUser'
    },
    render: function () {
      var that = this;
      this.userModel = new UserModel({username: Session.get('username')});
      this.userModel.fetch({
        success: function (user) {
          that.$el.html(Mustache.render(profileEditTemplate, {user: user.attributes}));
        }
      })
    }, 
    editUser: function (ev) {
      var newDetails = $(ev.currentTarget).serializeObject();
      console.log(newDetails);
      this.userModel.save(newDetails, {
        success: function () {
          Backbone.history.navigate('user/' + Session.get('username'), {trigger: true});
        }
      })
      return false;
    },
    clean: function () {
    }
  });
  return ProfileEditView;
});
