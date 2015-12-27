Router.configure({
  layoutTemplate: 'layout',
  yieldTemplates: {
    'home': {to: 'home'},
    'about': {to: 'about'},
    'blog': {to: 'blog'},
    'contact': {to: 'contact'},
    'gallery': {to: 'gallery'},
    'private': {to: 'private'}
  }
});

Router.map(function(){
  this.route('/', 'layout');
  this.route('/gallery', 'gallery');
});
