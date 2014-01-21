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
	},
	upvotedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.upvoters, userId)) {
			return 'btn-success';
		} else {
			return 'btn-danger';
		}
	}	
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
	},	
	upvotedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.upvoters, userId)) {
			return 'btn-success';
		} else {
			return 'btn-danger';
		}
	}	
});

Template.postItem.events({
	'click .upvote': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});


Template.postItem2.events({
	'click .upvote': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});