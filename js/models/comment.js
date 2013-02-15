define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Comment = Backbone.Model.extend({
    url: function () {
      return '/' + this.username + '/comments' 
    }
  });

  return Comment;
});
