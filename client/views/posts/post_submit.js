Template.postSubmit.events ({
	'submit form': function (e) {
		e.preventDefault();

		var post = {	// Hay que añadir más campos: date, creado por, categoria, etc.
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			author: Meteor.user().username
		}

		post._id = Posts.insert(post);
		Router.go('postPage', post);
	}
});