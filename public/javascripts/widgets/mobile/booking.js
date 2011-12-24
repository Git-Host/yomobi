//
// MOBILE
//
(function ($) {
  
  window.widgetClasses.booking = Widget.extend({
    requiredAttrs: ['email'],

    getShowData: function () {
      var extraData = {
        times: util.clock15mIncrements()
      };
      return _.extend(this.toJSON(),extraData);
    }
  });


  window.widgetPages.booking = WidgetPageView.extend({

    events: {
      'submit': 'submit',
      'postRender': 'spawnCaptcha'
    },
    
    init: function (widget) {
      _.bindAll(this,'submit');
    },
    
    spawnCaptcha: util.widget.spawnCaptcha,

    prettyErrorMsg: prettyErrorMsg,
    submit: util.widget.widgetPageViewSubmit,

    validateParams: function (params) {
      params.phone = params.phone.replace(/[^0-9]+/g,'');
      if (params.phone.length != 10)
        return { name:'phone', reason:'Invalid phone number.' };
      return undefined;
    }

  });


  function prettyErrorMsg (serverResponse) {
    var msg = '<ul>';
    if (serverResponse === "bad message")
      msg += '<li>You must fill in all fields.</li>';
    else if (serverResponse === "captcha") {
      msg += '<li>Incorrect math answer. Please try again.</li>';
      util.spawnAritcaptcha();
    }
    else if (serverResponse === "bad phone")
      msg += '<li>Invalid phone number.</li>';
    util.log('SERVER RESPONSE',serverResponse);
    return msg + '</ul>';
  }

})(jQuery);
