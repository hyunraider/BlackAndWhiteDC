Meteor.publish('allimages', function(){
	return ImageInfo.find();
});
Meteor.publish('categoryimages', function(category){
	return ImageInfo.find({category: category});
});