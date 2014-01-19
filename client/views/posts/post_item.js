Template.postItem.helpers({
	ownPost: function() {
		return this.userId == Meteor.userId();
	},
	domain: function() {
	var a = document.createElement('a');
	a.href = this.url;
	return a.hostname;
	},
	submittedText: function() {
	return new Date(this.submitted).toLocaleString();
	}
//	commentsCount: function() {			No se necesita ya porque metimos commentsCount en cad post
//		return Comments.find({postId: this._id}).count();
//	}
});

Template.postItem2.helpers({   //manera temporal de quitar el boton de comentar cuando ya estamos en comentarios
	ownPost: function() {
		return this.userId == Meteor.userId();
	},
	domain: function() {
	var a = document.createElement('a');
	a.href = this.url;
	return a.hostname;
	},
	submittedText: function() {
	return new Date(this.submitted).toLocaleString();
	}
});