define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var UserModel = Backbone.Model.extend({
    urlRoot: '/user',
    idAttribute: 'username'

  });
  return UserModel;

});
