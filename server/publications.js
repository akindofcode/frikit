// Vamos a publicar los datos que queremos que lleguen al cliente

Meteor.publish('posts', function() {
	return Posts.find();
});