Template.gallery.events({
  'submit form': function(e, t) {
    e.preventDefault();

    var files = [];
    var file = $('#userimage')[0].files[0];
    var name = $('#inputName').val();
    var description = $('#inputDescription').val();
    var category = $('#inputCategory').val();
    var price = $('#inputPrice').val();
    var orientation;
    if ($('#checkOrientation').prop("checked")){
      orientation = 'portrait';
    }else{
      orientation = 'landscape';
    }
    console.log(name + " " + description + " " + category + " " + price);
    files.push(file);
    console.log(file);
    ImageInfo.insert({name: name, description: description, category: category, price: price, orientation: orientation});

    Cloudinary.upload(files, {
      public_id: 'BnW/' + name
    }, function(result){console.log(result);});

    $('#submitPicture').each(function(){
      this.reset();
    });
  },
  'click .glyphicon-remove': function(e, t){
    e.preventDefault();

    Cloudinary.delete('BnW/' + e.target.id, function(result){
      console.log(result);
    });

    ImageInfo.remove({_id: ImageInfo.findOne({name: e.target.id})["_id"]});
  },
  'click .galleryimage': function(e, t){
    e.preventDefault;
    var target = e.target;
    $('#postimage').attr('src', $(target).attr('src'));
    $('#posttitle').text(this.name);
    $('#posttext').text(this.description);
    $('#postprice').text(this.price);
    $('#postcategory').text(this.category);
    $('.gallerypost').show();
  }
});

Template.gallery.helpers({
  isAdmin: function(){
    return Meteor.userId()===Meteor.users.findOne({username: "admin"})["_id"];
  },
  images: function(){
    return ImageInfo.find({});
  },
  nameHelper: function(name){
    return 'BnW/' + name;
  },
  isPortrait: function(orientation){
    return orientation==='portrait';
  }
});


Template.gallerypost.onRendered(function(){
  $('.gallerypost').hide();
});

Template.gallerypost.events({
  'click .exit': function (e, t) {
    e.preventDefault();
    $('.gallerypost').hide();
  }
});