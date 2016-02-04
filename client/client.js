$.cloudinary.config({
  cloud_name: 'hyunraider'
});
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
sessionGalleryHandler = false;

Session.setDefault('lazyloadLimit', 15);
Meteor.subscribe('allimages');
Session.setDefault('pause', false);
Session.setDefault('search', null);

Session.setDefault('category', null);
/*Tracker.autorun(function(){
	Meteor.subscribe('categoryimages', Session.get('category'));
	console.log('this is working');

  	$('.grid').masonry('reloadItems');
});*/