Cloudinary.config({
  cloud_name: 'hyunraider',
  api_key: '985637723259571',
  api_secret: 'yrROWfcKrsRkxDIp84qGWMsOZqI'
});
Meteor.methods({
    removeAll: function(){
        ImageInfo.remove({});
    },
    showID: function(){
      console.log(Meteor.userId());
    }
});
