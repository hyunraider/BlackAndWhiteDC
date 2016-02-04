Template.admin.helpers({
	search: function () {
		var temp = Session.get('search');
		if (temp==null){
			return ImageInfo.find({name:'012dfds023423'});
		}else{
			return ImageInfo.find({name:{$regex:temp}});
		}
	},
	nameHelper: function(name){
    	return 'BnW/' + name;
  	}
});

Template.admin.events({
	'click #query': function () {
		var temp = $('#inputTitle').val();
		Session.set('search', temp);
	}
});