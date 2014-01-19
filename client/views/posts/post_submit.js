Template.postSubmit.events ({
	'submit form': function (e) {
		e.preventDefault();

		var post = {	// Hay que añadir más campos: date, creado por, categoria, etc.
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		Meteor.call('post', post, function(error,id) {
			if (error) {
			// muestra el error en pantalla
			throwError(error.reason);

			if (error.error === 302)
				Router.go('postPage', {_id: error.details})
			} else {
				Router.go('postPage', {_id: id});
			}
		});
	}
});