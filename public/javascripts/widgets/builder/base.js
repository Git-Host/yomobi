// 
// BUILDER
// 
(function ($) {
  
  window.Widget = window.Widget.extend({
    
    url: function () {
      var base = '/widgets';
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
    },
    sync: util.deleteSync,
    
    initialize: function () {
      this.pageView = new (widgetPages[this.get('wtype')] || WidgetPageView)({
        widget: this
      });
      this.bind('change:name',this.updatePrettyName);
      
      this.updatePrettyName(this,this.get('name'));
      
      this.init && this.init();
    },
    
    updatePrettyName: function (model,newName) {
      model.set({ prettyName:util.prettifyName(newName) });
      if (this.homeView) this.homeView.render();
    },

    isAvailable: function () {
      return this.get('available_') === true;
    },
    
    onHomeViewClick: function () {
      return !!bapp.homeViewWidgetClick(this);
    },
    
    getEditor: function () {
      this.editor = this.editor || util.newEditor(this);
      return this.editor;
    },
    
    getEditData: function () {
      return this.toJSON();
    },
    
    getEditAreaData: function () {
      var data = {}
        , templateId = this.get('singleton') ? this.get('name') : this.get('wtype')
        , editAreaTemplate = util.getTemplate(templateId + '-edit-area')
        , editData = _.extend({
            subHelpText: util.getWidgetBData(this).subHelp
          }, this.getEditData())
      ;
      data.editAreaContent = editAreaTemplate(editData);
      data.iconName = templateId;
      
      return _.extend(data, this.toJSON());
    },
    
    set: function(attributes, options) {
      if (attributes._id) {
        attributes.id = attributes._id;
        delete attributes._id;
      }
      if (attributes.email === null || attributes.email === '') {
        attributes.email = g.userEmail;
      }

      return Backbone.Model.prototype.set.call(this, attributes, options);
    }
  });
  
})(jQuery);
