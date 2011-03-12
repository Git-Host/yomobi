(function ($) {
  
  window.Widget = Backbone.Model.extend({
    
    url: function () {
      var base = '/widgets';
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
    },
    sync: Backbone.sync,
    
    pageContent: function () {
      this._template = this._template ||
                       util.getTemplate(this.get('wtype') + '-page');
      return this._template(this.toJSON());
    },
    
    initialize: function () {
      var prettyName = _(this.get('name').split('-')).chain()
          .map(function (word) { return util.prettify(word); })
          .value()
          .join(' ')
      ;
      this.set({ prettyName:prettyName });
    },
    
    onHomeViewClick: function () {
      return !!bapp.homeViewWidgetClick(this);
    },
    
    set: function(attributes, options) {
      if(attributes._id) {
        attributes.id = attributes._id;
        delete attributes._id;
      }
      Backbone.Model.prototype.set.call(this, attributes, options);
      return true;
    }
  });
  
})(jQuery);
