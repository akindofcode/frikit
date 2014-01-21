Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',  // template a la que redirigir cuando la aplicación está esperando datos
	waitOn: function() { 
		return [Meteor.subscribe('notifications')];
	}
	// disableProgressSpinner : true 	iron-router-progress
});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	postsLimit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.postsLimit()};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	postCount: function() {
		return parseInt(Posts.find().count());
	},
	data: function() {
		return {posts: Posts.find({}, this.findOptions()),
		nextPath:this.route.path({postsLimit: this.postsLimit() + this.increment})
		};
	}
});

NewPostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	postsLimit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {submitted: -1, _id: -1}, limit: this.postsLimit()};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	postCount: function() {
		return parseInt(Posts.find().count());
	},
	data: function() {
		return {posts: Posts.find({}, this.findOptions()),
		nextPath:this.route.path({postsLimit: this.postsLimit() + this.increment})
		};
	}
});


BestPostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	postsLimit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {votes: -1, submitted: -1,_id: -1}, limit: this.postsLimit()};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	postCount: function() {
		return parseInt(Posts.find().count());
	},
	data: function() {
		return {posts: Posts.find({}, this.findOptions()),
		nextPath:this.route.path({postsLimit: this.postsLimit() + this.increment})
		};
	}
});

Router.map(function() {

	this.route('postPage', {
		path: '/posts/:_id',
		waitOn: function() {
			return Meteor.subscribe('comments', this.params._id);
		},
		data: function() { return Posts.findOne(this.params._id); }
	});

	this.route('postEdit', {
		path: '/posts/:_id/editar',
		data: function() { return Posts.findOne(this.params._id); }
	});

	this.route('postSubmit', {
		path: '/nuevo',
		// disableProgress: true		 iron-router-progress
	});

	this.route('newPosts', {
		path: '/new/:postsLimit?',
		controller: NewPostsListController
	});
	
	this.route('bestPosts', {
		path: '/best/:postsLimit?',
		controller: BestPostsListController
	});
	
	// esta tiene que ir la ultima
	this.route('home', {
		path: '/:postsLimit?',
		controller: NewPostsListController
	});


	
});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDenied');

	this.stop();
	}
}

Router.before(requireLogin, {only: 'postSubmit'});
Router.before(function() {clearErrors() });

