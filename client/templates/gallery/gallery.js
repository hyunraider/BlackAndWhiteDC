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
    e.preventDefault();
    var keyword = $(e.target).text();
    var pos = keyword.indexOf("(");
    keyword = keyword.slice(0,pos-1);
    /*$('.grid-item').each(function(){
      $grid.masonry('remove', this).masonry('layout');
    });*/
    Session.set('category', keyword);
    Session.set('lazyloadLimit', 15);
    Meteor.setTimeout(function(){
      Session.set('pause', !Session.get('pause'));
    }, 10);
    
  },
  'click #allcategory': function(e, t){
    e.preventDefault();
    Session.set('category', null);
    Session.set('lazyloadLimit', 15);
    
    Meteor.setTimeout(function(){
      Session.set('pause', !Session.get('pause'));
    }, 10);
  },
  'click #testing': function(e, t) {
    e.preventDefault();
    Session.set('lazyloadLimit', Session.get('lazyloadLimit')+5);
    Meteor.setTimeout(function(){
      Session.set('pause', !Session.get('pause'));
    }, 10);
  }
});

Template.gallery.onRendered(function(){
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

Template.subgallery.onRendered(function(){
  var $container = $('.grid');
  $grid = $container.masonry({
        itemSelector: '.grid-item'
    });
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });

  Tracker.autorun(function(){
    Session.get('pause');
    $grid.masonry('destroy');
    $grid.masonry({
      itemSelector: '.grid-item'
    });
    $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });
  }); 
});

Template.gallery.helpers({
  images: function(){
    if (Session.get('category')==null){
      return ImageInfo.find();
    }else{
      return ImageInfo.find({category: Session.get('category')});
    }
  },
  
  sessioncat: function(){
    return Session.get('category');
  },

  pause: function(){
    return !Session.get('pause');
  }
});

Template.subgallery.helpers({
  nameHelper: function(name){
    return 'BnW/' + name;
  },
  isPortrait: function(orientation){
    return orientation==='portrait';
  },
  images: function (cat) {
    if (cat==null){
      return ImageInfo.find({}, {limit: Session.get('lazyloadLimit')});
    }else{
      return ImageInfo.find({category: cat});
    }
  }
});

Template.gallerypost.events({
  'click .exit': function (e, t) {
    e.preventDefault();
    $('.gallerypost').hide();
  }
});