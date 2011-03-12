(function ($) {

  // =================================
  Widgets = Backbone.Collection.extend({

    model: Widget,

    sync: util.couchSync,
    url: 'http://yomobi.couchone.com/' + g.appData.company +
         '/_design/widgets/_view/by_name?include_docs=true',

    parse: function (res) {
      util.log('widget res',res);
      return _.map(res.rows, function (row) {
        var w = row.doc;
        return new window.widgetClasses[w.wtype](w);
      });
    }
  });
  
  // ==================================
  WidgetHomeView = Backbone.View.extend({
    tagName: 'div',
    className: 'home-icon',
    
    template: util.getTemplate('home-icon'),
    
    events: {
      'click': 'onClick'
    },
    
    initialize: function () {
      _.bindAll(this,'render','onClick');
      this.model.homeView = this;
    },
    
    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    
    onClick: function () {
      if(this.model.onHomeViewClick()) {
        mapp.getNextWidgetPage().content.html(this.model.pageContent());
        mapp.goToPage(this.model.get('name'));
      }
    }
  });
  
  // ============================
  HomeView = Backbone.View.extend({
    el: $('#home'),
    
    initialize: function (widgets) {
      this.widgets = widgets;
      
      self = this;
      this.widgets.each(function (w) {
        var view = new WidgetHomeView({ model:w });
        $(self.el).find('.content').append(view.render().el);
      });
    }
  });
  
  // =======================================
  MobileAppController = Backbone.Controller.extend({

    routes: {
      '':               'home',
      'page/:widget':   'viewWidget'
    },
  
    home: function () {
      mapp.goHome();
    },
  
    viewWidget: function (name) {
      util.log('viewing',name);
      // TODO: show view for this widget
    }
  
  });
  
  // ===========================
  window.MobileAppView = Backbone.View.extend({

    el: $('#mobile-container'),
    
    events: {
      'click .back-btn':      'goBack'
    },
    
    headerTemplate: util.getTemplate('mapp-header'),
    
    // n == 0 is home, n > 0 is widget page level depth
    pageLevel: 0,
    
    widgets: new Widgets(),
    
    initialize: function (options) {
      _.bindAll(this, 'render');
      
      // TODO: grab widget data from server
      this.homeView = new HomeView(this.widgets);
      
      this.widgets.bind('refresh', this.render);
      this.widgets.fetch({
        success: function (widgets,res) {
          this.homeView = new HomeView(widgets);
        }
      });
    },
    
    render: function () {
      $('#company-info').html(this.headerTemplate({
        name: g.appData.company,
        prettyName: util.prettify(g.appData.company)
      }));
    },
    
    goBack: function () {
      history.go(-1);
    },
    
    getActiveWidgetPage: function () {
      if(this.pageLevel == 0) return null;
      return this.el.find('.page:eq(1)');
    },
    
    getNextWidgetPage: function () {
      var page = this.el.find('.page:eq(' + (this.pageLevel+1) + ')');
      return {
        topBar:  page.find('.top-bar'),
        content: page.find('.content')
      }
    },
    
    getPreviousWidgetPage: function () {
      if (this.pageLevel <= 1) return null;
      return this.el.find('.page:eq(' + (this.pageLevel-1) + ')');
    },
    
    goToPage: function (widgetName) {
      window.location.href = "#page/"+widgetName;
      mapp.transition('forward');
    },
    
    goHome: function () {
      // TODO: delete all pages between current
      // and home for a smoother transition
      if (this.pageLevel > 0){
        mapp.transition('back');
      }
    },
    
    transition: function (direction) {
      if(!util.reserve('pageTransition')) return;
      var self = this
        , delta = (direction == 'forward') ? 1 : -1
        , deltaStr = (direction == 'forward') ? '-=' : '+='
      ;
      util.log('lol');
      
      this.el.find('#canvas').animate({
        left: deltaStr + g.width
      }, 350, function () {
        mapp.pageLevel += delta;
        util.release('pageTransition');
      });
    }
  });
  
})(jQuery);
