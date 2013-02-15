// Filename: router.js
define([
  'require',
  'jquery',
  'underscore',
  'backbone',
	'vm',
  'views/home/page',
  'views/user/register',
  'views/user/profile',
  'views/user/profile_edit',
  'views/user/login',
  'views/users/page'
], function (require, $, _, Backbone, Vm, HomeView, RegisterView, ProfileView, ProfileEditView, LoginView, UsersView) {
  var AppRouter = Backbone.Router.extend({
    routes: {

      'login': 'login',
      'users': 'users',
      'user/:username': 'profile',
      'profile/edit': 'profileEdit',
      'register': 'register',
      '': 'home',
      ':username': 'defaultAction' // All urls will trigger this route
    }
  });

  var initialize = function(options){
    
		var appView = options.appView;
    var router = new AppRouter(options);
    Backbone.router = router;
    router.on('route:users', function () {
      var usersView = Vm.create(appView, 'page', UsersView, {});
      usersView.render();
    });
    router.on('route:home', function () {
      var homeView = Vm.create(appView, 'page', HomeView, {});
      homeView.render();
    });
    router.on('route:profile', function (username) {
      var profileView = Vm.create(appView, 'page', ProfileView, {username: username});
      profileView.render();
    });
    router.on('route:profileEdit', function () {
      var profileEditView = Vm.create(appView, 'page', ProfileEditView, {});
      profileEditView.render();
    });
    router.on('route:register', function () {
      var registerView = Vm.create(appView, 'page', RegisterView, {});
      registerView.render();
    });

    router.on('route:login', function () {
      var loginView = Vm.create(appView, 'page', LoginView, {});
      loginView.render();
    });
  };
  return {
    initialize: initialize
  };
});
