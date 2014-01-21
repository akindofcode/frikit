Template.postEdit.helpers({
	post: function() {
		return Posts.findOne(this._id);  // no funciona con Session.get('currentPostId')
	}
});

Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentPostId = this._id; // Session.get('currentPostId');

		var postProperties = {
		url: $(e.target).find('[name=url]').val(),
		title: $(e.target).find('[name=title]').val(),
		//message: $(e.target).find('[name=message]').val()
		categoria: $(e.target).find('[name=categoria]').val()
		}
		
		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if (error) {
				// display the error to the user
			alert(error.reason);
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();
		
		if (confirm("¿Está seguro de que quiere borrar este frik-it?")) {
			var currentPostId = this._id; // Session.get('currentPostId');
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});