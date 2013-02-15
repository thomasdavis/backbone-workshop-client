define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/user/login.html',
  'models/user'
], function($, _, Backbone, Session, registerTemplate, UserModel){
  var RegisterView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    events: {
      'submit form.login': 'login'
    },
    render: function () {
      if(Session.get('auth')) {
        console.log(Session);
        Backbone.history.navigate('user/' + Session.get('username'), {trigger: true});
      } else {
        this.$el.html(_.template(registerTemplate, {username: Session.get('login')}));
      }

    }, 
    login: function (ev) {
      var userDetails = $(ev.currentTarget).serializeObject();
      Session.login(userDetails, function () {
        Backbone.history.navigate('user/' + Session.get('username'), {trigger: true});
      })
      return false;
    },
    clean: function () {
    }
  });
  return RegisterView;
});
