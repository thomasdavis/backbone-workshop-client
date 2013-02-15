define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/page.html'
], function($, _, Backbone, Session, homeTemplate){
  var HomePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      if(Session.get('auth')) {
        Backbone.history.navigate('user/' + Session.get('username'), {trigger: true});
      } else {
        var that = this;
        this.$el.hide().fadeIn(250);
        
        if(Session.get('auth')){
          this.$el.html(_.template(homeTemplate, {username: Session.get('login')}));
        } else {
          this.$el.html(_.template(homeTemplate, {username: false, errors: Session.get('errors'), _: _})); 
        }


      }

    }, 
    clean: function () {
    }
  });
  return HomePage;
});
