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
    removeCategory: function(){
      CategoryList.remove({});
    },
    showID: function(){
      console.log(Meteor.userId());
    },
    showSession: function(){
      console.log(Session.get('category'));
    }
});
