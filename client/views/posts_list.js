Template.postsList.helpers({
	hasMorePosts : function() {
		//alert(Session.get("postCount"));
		return Router.current().postsLimit() >= Session.get("postCount");

//		return Router.current().postsLimit() > Router.current().postCount();
  	}, // quizas se podria mirar en el router para que el path nunca fuera mayor que el total de posts
  	numero: function() {
  		return Session.get("postCount");
  	},
  	grupo: function() {
  		return Session.get("opcion");
  	},
  	ord: function() {
  		return Session.get("orden");
  	}
});