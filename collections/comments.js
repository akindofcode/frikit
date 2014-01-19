Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes) {
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		
		// Nos aseguramos de que el usuario esta logueado
		if (!user)
			throw new Meteor.Error(401, "Tienes que estar logueado para añadir un comentario");
		if (!commentAttributes.body)
			throw new Meteor.Error(422, 'Por favor, escribe un comentario');
		if (!commentAttributes.postId)
		throw new Meteor.Error(422, 'Tienes que comentar en un frikit');
		
		comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		Posts.update(comment.postId, {$inc: {commentsCount: 1}});

		return Comments.insert(comment);
	}
});