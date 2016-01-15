Template.blog.helpers({
  isAdmin: function(){
    return Meteor.userId()===Meteor.users.findOne({username: "admin"})["_id"];
  },
  blogposts: function() {
    return Blog.find();
  }
});
Template.blogshow.helpers({
  isAdmin: function () {
    return Meteor.userId()===Meteor.users.findOne({username: "admin"})["_id"];
  }
});

Template.blogpost.onRendered(function(){
  this.$('#summernote').summernote({
    height: 200,
    focus: true
  });
});

Template.blogpost.events({
  'submit form': function(e,t){
    e.preventDefault();

    var files = [];
    var file = $('#userimage')[0].files[0];
    var title = $('#inputTitle').val();
    var location = $('#inputLocation').val();
    var content = $('#summernote').summernote('code');
    console.log(title + " " + location + " " + content + " ");
    files.push(file);
    console.log(file);
    Blog.insert({title: title, location: location, timeCreated: new Date(), content: content});

    Cloudinary.upload(files, {
      public_id: "BnW/BLOG_" + title
    }, function(result){console.log(result);});

    $('#blogpost').each(function(){
      this.reset();
    });
  }
});

Template.blogshow.helpers({
  formatTitle: function(){
    return "BnW/BLOG_" + this.title;
  }
});

Template.blogshow.events({
  'click .glyphicon-remove': function(e, t){
    e.preventDefault();

    Cloudinary.delete('BnW/BLOG_' + e.target.id, function(result){
      console.log(result);
    });

    Blog.remove({_id: Blog.findOne({title: e.target.id})["_id"]});
  }
});
