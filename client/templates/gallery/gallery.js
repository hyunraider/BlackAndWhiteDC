
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
  },
  'click #categories': function(e, t){
    var keyword = $(e.target).text();
    var pos = keyword.indexOf("(");
    keyword = keyword.slice(0,pos);

    $('.master').data('category', keyword);
  }
});

Template.gallery.onRendered(function(){
  var $container = $('.grid');

  Meteor.subscribe('allimages');

  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector: '.grid-item'
    });
  });

  var categorylist = {};

  for (var j=0; j<ImageInfo.find().fetch().length; j++){
    var cat = ImageInfo.find().fetch()[j].category;
    if (cat in categorylist){
      categorylist[cat]++;
    }else{
      categorylist[cat] = 1;
    }
  }
  for (var i in categorylist){
    $('#categorylisting').append('<li id="categories">' + i + " (" + categorylist[i] +")"+'</li>');
  };

});

Template.gallery.helpers({
  images: function(){
    return ImageInfo.find({});
  },
  nameHelper: function(name){
    return 'BnW/' + name;
  },
  isPortrait: function(orientation){
    return orientation==='portrait';
  },
  categoryMaker: function(){
    var x = $('.master').data("category");

    if (x==undefined){
      return 'A_ALLIMAGES';
    }else{
      return $('.master').data("category");
    }
  }
});

Template.gallerypost.events({
  'click .exit': function (e, t) {
    e.preventDefault();
    $('.gallerypost').hide();
  }
});