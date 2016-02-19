Meteor.subscribe('lel');

Meteor.startup(function(){

  
  Tracker.autorun(function(){
    Meteor.call('removeCategory');
  
  var categorylist = {};
 
  
  for (var j=0; j<ImageInfo.find().fetch().length; j++){
    var cat = ImageInfo.find().fetch()[j].category;
    if (cat in categorylist){
      categorylist[cat]++;
    }else{
      categorylist[cat] = 1;
    }
  }

  console.log(categorylist);
  for (var i in categorylist){
    CategoryList.insert({name: i, number: " (" +categorylist[i] + ")"});
  };
  });
  
});

$.cloudinary.config({
  cloud_name: 'hyunraider'
});
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
sessionGalleryHandler = false;

Session.setDefault('lazyloadLimit', 15);
Meteor.subscribe('lazyload-posts', Session.get('lazyloadLimit'));
Meteor.subscribe('shows');
Meteor.subscribe('blog');
Meteor.subscribe('lel');
Session.setDefault('pause', false);
Session.setDefault('search', null);

Session.setDefault('category', null);
/*Tracker.autorun(function(){
	Meteor.subscribe('categoryimages', Session.get('category'));
	console.log('this is working');

  	$('.grid').masonry('reloadItems');
});*/
