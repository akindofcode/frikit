Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',  // template a la que redirigir cuando la aplicación está esperando datos
	waitOn: function() { 
		return [Meteor.subscribe('notifications')];
	}
	// disableProgressSpinner : true 	iron-router-progress
});

/* PostsListController = RouteController.extend({
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
}); */

OriginalPostsListController = RouteController.extend({
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
		Session.set("postCount",Posts.find().count());
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
	cat: function() {
		if (Session.equals("opcion","Todo")) return {};
		return {categoria: Session.get("opcion")};
	},
	findOptions: function() {
		return {sort: {submitted: -1, _id: -1}, limit: this.postsLimit()};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.cat(), this.findOptions());
	},
	postCount: function() {
		return parseInt(Posts.find().count());
	},
	data: function() {
		Session.set("postCount",Posts.find(this.cat()).count());
		return {posts: Posts.find(this.cat(), this.findOptions()),
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
	cat: function() {
		if (Session.equals("opcion","Todo")) return {};
		return {categoria: Session.get("opcion")};
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
		Session.set("postCount",Posts.find(this.cat()).count());
		return {posts: Posts.find(this.cat(), this.findOptions()),
		nextPath:this.route.path({postsLimit: this.postsLimit() + this.increment})
		};
	}
});


OriginalBestPostsListController = RouteController.extend({
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

// Vamos a crear una ruta para cada categoria


	this.route('Cine', {
		path: '/new/:postLimit?',
		controller: NewPostsListController
	}); 

	this.route('Comics', {
		path: '/new/:postLimit?',
		controller: NewPostsListController
	}); 

	this.route('Informatica', {
		path: '/new/:postLimit?',
		controller: NewPostsListController
	}); 

	this.route('Libros', {
		path: '/new/:postLimit?',
		controller: NewPostsListController
	}); 

	this.route('Videojuegos', {
		path: '/new/:postLimit?',
		controller: NewPostsListController
	}); 

	this.route('Musica', {
		path: '/new/:postLimit?',
		controller: NewPostsListController
	}); 

	this.route('Otros', {
		path: '/new/:postLimit?',
		controller: NewPostsListController
	}); 

	this.route('Television', {
		path: '/new/:postLimit?',
		controller: NewPostsListController
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
		controller: OriginalPostsListController
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

