Template.gallery.events({
  'submit form': function(e, t) {
    e.preventDefault();

    var files = [];
    var file = $('#userimage')[0].files[0];
    var name = $('#inputName').val();
    var description = $('#inputDescription').val();
    var category = $('#inputCategory').val();
    var price = $('#inputPrice').val();
    console.log(name + " " + description + " " + category + " " + price);
    files.push(file);
    console.log(file);
    ImageInfo.insert({name: name, description: description, category: category, price: price});

    Cloudinary.upload(files, {
      public_id: name
    }, function(result){console.log(result);});

    $('#submitPicture').each(function(){
      this.reset();
    });
  }
});

Template.gallery.helpers({
  isAdmin: function(){
    return Meteor.userId()===Meteor.users.findOne({username: "admin"})["_id"];
  },
  images: function(){
    return ImageInfo.find({});
  }
});
