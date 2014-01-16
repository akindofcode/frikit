Posts = new Meteor.Collection('posts'); // Usaremos la base de datos posts para almacenar todos los posts

Posts.allow({						 // se puede quitar si solo ponemos el boton de nuevo cuando haya un user
	insert: function(userId, doc) {  // solo se puede añadir posts si estamos logueados
		return !! userId;
	}
})

Meteor.methods({
	post: function(postAttributes) {
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
			throw new Meteor.Error(302, "Este enlace ya ha sido añadido", postWithSameLink._id);
		}

		// ahora añadimos los campos de usuario y fecha

		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	}
});