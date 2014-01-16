Posts = new Meteor.Collection('posts'); // Usaremos la base de datos posts para almacenar todos los posts

Posts.allow({
	insert: function(userId, doc) {  // solo se puede añadir posts si estamos logueados
		return !! userId;
	}
})

