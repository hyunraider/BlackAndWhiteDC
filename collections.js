//dropbox password: Ihave1car!
if (Meteor.isClient) {
  var imagestore = new FS.Store.Dropbox("images");

  Images = new FS.Collection("images", {
    stores: [imagestore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    }
  });
}

if (Meteor.isServer) {
  var imagestore = new FS.Store.Dropbox("images", {
    key: "97v2pxjpuqhgo5y",
    secret: "htet45rj7hd6q6q",
    token: "4L35QNjNqLAAAAAAAAAABsgV4zU9mmWhVB1nrOQSi4f9n8dr_pqGloxwyC4kKh5P",
    transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize('250', '250').stream().pipe(writeStream)
    }
  });
  Images = new FS.Collection("images", {
    stores: [imagestore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    }
  });
}

ImageInfo = new Mongo.Collection('imageinfo');

Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  }
});
