define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/user/register.html',
  'models/user'
], function($, _, Backbone, Session, registerTemplate, UserModel){
  var RegisterView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    events: {
      'submit form.register': 'register'
    },
    render: function () {
      if(Session.get('auth')) {
        Backbone.history.navigate('user', Session.get('login'), {trigger: true});
      } else {
        this.$el.html(_.template(registerTemplate, {username: Session.get('login')}));
      }
    }, 
    register: function (ev) {
      var userDetails = $(ev.currentTarget).serializeObject();
      var userModel = new UserModel;
      userModel.save(userDetails, {
        success: function (model) {
          console.log(model, 'USER Created');
        } 
      });
      return false;
    },
    clean: function () {
    }
  });
  return RegisterView;
});
