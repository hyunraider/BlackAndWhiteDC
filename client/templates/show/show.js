Template.showpost.events({
	'submit form': function (e, t) {
		e.preventDefault();

		var files = [];
    	var file = $('#userimage')[0].files[0];
    	var name = $('#inputShow').val();
    	var address = $('#inputAddress').val();
    	var link = $('#inputWebsite').val();
    	var description = $('#inputDescription').val();
    	var showtype = $('select option:selected').text();
    	
    	if (files !== undefined){
    		files.push(file);
    		Show.insert({name: name, address: address, link: link, description: description, showtype: showtype, image: true});

	    	Cloudinary.upload(files, {
	    		public_id: 'BnW/SHOW_' + name
	    	}, function(result){console.log(result);});
    	}else{
    		Show.insert({name: name, address: address, link: link, description: description, showtype: showtype, image: false});
    	}
    	

    	$('#submitShow').each(function(){
    		this.reset();
    	});
	}
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