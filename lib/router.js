Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',  // template a la que redirigir cuando la aplicación está esperando datos
	waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.map(function() {
	this.route('postsList', {path: '/'});

	this.route('postPage', {
		path: '/posts/:_id',
		data: function() { return Posts.findOne(this.params._id); }
	});
});
