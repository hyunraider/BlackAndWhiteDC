Meteor.publish('allimages', function(){
	return ImageInfo.find();
})
Meteor.publishComposite('currentgallery', function(keyword){
	return {
		find: function() {
			return ImageInfo.find({category: keyword});
		}
	}
});