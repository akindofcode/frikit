Template.postsList.helpers({
	hasMorePosts : function() {
		return Router.current().postsLimit() > Router.current().postCount();
  } // quizas se podria mirar en el router para que el path nunca fuera mayor que el total de posts
});