Template.postsList.helpers({
	posts: function() {
		return Posts.find({}, {sort: {submitted: -1}});
	}
});

Template.postItem.helpers({
	domain: function() {
	var a = document.createElement('a');
	a.href = this.url;
	return a.hostname;
},
	submittedText: function() {
	return new Date(this.submitted).toLocaleString();
	}
});