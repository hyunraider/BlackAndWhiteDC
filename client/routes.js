Router.configure({
  layoutTemplate: 'layout',
  yieldTemplates: {
    'home': {to: 'home'},
    'about': {to: 'about'},
    'blog': {to: 'blog'},
    'contact': {to: 'contact'},
    'gallery': {to: 'gallery'}
  }
});

Router.map(function(){
  this.route('/', 'layout');
});
