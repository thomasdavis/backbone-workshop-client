define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'mustache',
  'models/session',
  'text!templates/comments/widget.html',
  'collections/comments',
  'models/comment'
], function($, _, Backbone, Router, Mustache, Session, commentsTemplate, CommentsCollection, CommentModel){
  var CommentsWidget = Backbone.View.extend({
    el: '.comments-container',
    initialize: function (options) {
      var that = this;
    },  
    events: {
      'submit form.comment': 'postComment'
    },
    render: function () {
      var that = this;
      this.comments = new CommentsCollection();
      this.comments.username = this.options.username;
      this.comments.fetch({
        success: function (comments) {
          that.$el.html(Mustache.render(commentsTemplate, {user: Session.get('user'), comments: comments.models}));
        }
      })
    },
    postComment: function (ev) {
      var that = this;
      var comment = $(ev.currentTarget).serializeObject();
      this.comments.create(comment, {
        success: function (comment) {
          that.render();
        }
      });
      return false;
    }
  });
  return CommentsWidget;
});

