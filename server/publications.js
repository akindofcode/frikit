// Vamos a publicar los datos que queremos que lleguen al cliente, este ha de subscribirse en /client/main.js

Meteor.publish('posts', function() {
	return Posts.find();
});

// Por ejemplo si queremos publicar solo parte de una colección, podríamos hacer:
// Meteor.publish('somePosts', function() {
//  	return Posts.find({'author':'Tom'});
// });
// Si queremos excluir algunos campos, hacemos:
// Meteor.publish('somePosts', function() {
//  	return Posts.find({'author':'Tom'}, {fields: {date:false}});
// });

Meteor.publish('comments', function (postId) {
	return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
});

Houston.add_collection(Meteor.users,Comments,Notifications);
