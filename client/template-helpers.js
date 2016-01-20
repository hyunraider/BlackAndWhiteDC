Template.registerHelper('formatTime', function(Date){
	return (Date.getMonth()+1) + "/" + Date.getDate() + "/" + Date.getFullYear();
});

Template.registerHelper('isAdmin', function(){
	return Meteor.userId()===Meteor.users.findOne({username: "admin"})["_id"];
});