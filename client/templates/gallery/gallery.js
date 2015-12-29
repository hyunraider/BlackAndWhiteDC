Template.gallery.events({
  "dropped #dropzone": function(e){
    console.log('files dropped');

      // If using the cfs api
    FS.Utility.eachFile(e, function(file) {
      var newFile = new FS.File(file);
      Images.insert(newFile);
      console.log('Inserted file');
    });
  }
});
