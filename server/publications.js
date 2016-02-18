Meteor.publish('allimages', function(){
	return ImageInfo.find();
});
Meteor.publish('categoryimages', function(category){
	return ImageInfo.find({category: category});
});

Meteor.publish('shows', function(){
	return Show.find({});
});

Meteor.publish('blog', function(){
	return Blog.find({});
})

Meteor.publish('lazyload-posts', function (limit) {
	return ImageInfo.find({}, {
		limit: limit,
		sort: {timeCreated: -1}
	});
});

Meteor.publish('lel', function(){
	return CategoryList.find({});
})