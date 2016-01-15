Template.registerHelper('formatTime', function(Date){
	return (Date.getMonth()+1) + "/" + Date.getDate() + "/" + Date.getFullYear();
});
