Router.configure({
  layoutTemplate: 'layout',
  yieldTemplates: {
    'home': {to: 'home'},
    'about': {to: 'about'},
    'blog': {to: 'blog'},
    'contact': {to: 'contact'},
    'gallery': {to: 'gallery'},
    'private': {to: 'private'},
    'show': {to: 'show'}
  }
});

Router.map(function(){
  this.route('/', {
    path: '/',
    template: 'layout',
    data: function(){
      Session.set('url', 'home');
    }
  });
  this.route('Pages', {
    path: '/:name',
    template: 'layout',
    data: function(){
      Session.set('url', this.params.name);
    }
  });
});
