Template.showpost.events({
	'submit form': function (e, t) {
		e.preventDefault();

		var files = [];
    	var file = $('#userimage')[0].files[0];
    	var name = $('#inputShow').val();
    	var address = $('#inputAddress').val();
    	var link = $('#inputWebsite').val();
    	var content = $('#summernote').summernote('code');
    	var showtype = $('select option:selected').text();
    	
    	if (file !== undefined){
    		files.push(file);
    		Show.insert({name: name, address: address, link: link, description: content, showtype: showtype, image: true});

	    	Cloudinary.upload(files, {
	    		public_id: 'BnW/SHOW_' + name
	    	}, function(result){console.log(result);});
    	}else{
    		Show.insert({name: name, address: address, link: link, description: content, showtype: showtype, image: false});
    	}
    	

    	$('#submitShow').each(function(){
    		this.reset();
    	});
	}
});

Template.showing.events({
	'click .glyphicon-remove': function(e, t){
	    e.preventDefault();

	    Cloudinary.delete('BnW/SHOW_' + e.target.id, function(result){
	      console.log(result);
	    });

	    Show.remove({_id: Show.findOne({name: e.target.id})["_id"]});
	}
});

Template.showpost.onRendered(function(){
  this.$('#summernote').summernote({
    height: 200,
    focus: true
  });
});

Template.show.helpers({
	showCurrent: function () {
		return Show.find({showtype: "Current Works"});
	},
	showUpcoming: function(){
		return Show.find({showtype: "Upcoming Shows"});
	},
	showAwards: function(){
		return Show.find({showtype: "Awards"});
	}
});

Template.showing.helpers({
  formatTitle: function(){
    return "BnW/SHOW_" + this.name;
  },
  imageExist: function(){
  	return this.image;
  }
});