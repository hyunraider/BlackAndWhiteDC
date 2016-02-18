Cloudinary.config({
  cloud_name: 'hyunraider',
  api_key: '985637723259571',
  api_secret: 'yrROWfcKrsRkxDIp84qGWMsOZqI'
});
Meteor.methods({
    removeAll: function(){
        ImageInfo.remove({});
        Blog.remove({});
    },
    showID: function(){
      console.log(Meteor.userId());
    },
    showSession: function(){
      console.log(Session.get('category'));
    }
});

Meteor.startup(function(){
  console.log('b1');
  CategoryList.remove({});
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