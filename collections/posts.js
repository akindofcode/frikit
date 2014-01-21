Posts = new Meteor.Collection('posts'); // Usaremos la base de datos posts para almacenar todos los posts

Posts.allow ({
//	insert: function(userId, doc) {  // no hace falta ya que quitamos el boton de nuevo si no estas logueado
	update: ownsDocument,  	// ver lib/permisos.js
	remove: ownsDocument	// ver lib/permisos.js
});

Posts.deny ({
	update: function(userId, post, fieldNames) {
		// solo se pueden editar dos campos:
		return (_.without(fieldNames, 'url', 'title').length > 0 );
	}
})

Meteor.methods({
	post: function(postAttributes) {

		// chequeamos que la url lleva http:// delante y si no lo añadimos

		if (postAttributes.url.toLowerCase().substr(0,7)!='http://') 
		    postAttributes.url = 'http://'+postAttributes.url;

		var user = Meteor.user(),
			postWithSameLink = Posts.findOne({url: postAttributes.url});

		// nos aseguramos de que el user está logueado

		if (!user)
			throw new Meteor.Error(401, "Tienes que estar logueado para añadir nuevos frikits");

		// nos aseguramos de que el post tiene un titulo

		if (!postAttributes.title)
			throw new Meteor.Error(402, "Por favor, introduce un título");

		// nos aseguramos de que no haya otros posts con el mismo link

		if (postAttributes.url && postWithSameLink) {
			throw new Meteor.Error(302, "Este enlace ya ha sido añadido, puedes verlo a continuación:", postWithSameLink._id);
		}

		// ahora añadimos los campos de usuario y fecha

		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			commentsCount:0,
			upvoters: [],
			votes: 0
			// hay que añadir categorias
		});

		var postId = Posts.insert(post);

		return postId;
	},

	upvote: function(postId) {
		
		var user = Meteor.user();

		// aseguremonos de que el usuario esta logueado
		if (!user)
			throw new Meteor.Error(401, "You need to login to upvote");
		
		var post = Posts.findOne(postId);
		if (!post)
			throw new Meteor.Error(422, 'Post not found');
		
		if (_.include(post.upvoters, user._id))
			throw new Meteor.Error(422, 'Already upvoted this post');
		
		Posts.update(post._id, {
		$addToSet: {upvoters: user._id},
		$inc: {votes: 1}
		});
	}
});