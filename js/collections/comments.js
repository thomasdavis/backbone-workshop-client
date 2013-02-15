define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Comments = Backbone.Collection.extend({
    url: function () {
      return '/' + this.username + '/comments' 
    }
  });

  return Comments;
});
