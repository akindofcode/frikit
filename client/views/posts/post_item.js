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
});