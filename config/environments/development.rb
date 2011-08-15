Yomobi::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  config.opt_out_url_host = 'http://local.host:3000'

  config.couch_host = 'yomobi.couchone.com'
  config.couch_cred = ['yadmin', 'C0uch!tUp']

  # In the development environment your application's code is reloaded on
  # every request.  This slows down response time but is perfect for development
  # since you don't have to restart the webserver when you make code changes.
  config.cache_classes = false

  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_view.debug_rjs             = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin
  
  # use postfix on da local machine
  # ActionMailer::Base.smtp_settings = {
    # :host => "localhost"
  # }

  # use gmail for test emailing
  # config.action_mailer.delivery_method = :smtp
  # config.action_mailer.raise_delivery_errors = true
  # config.action_mailer.default_url_options = { :host => "local.host:3000" }
  # ActionMailer::Base.smtp_settings = {
  #   :address  => "smtp.gmail.com",
  #   :port  => 587,
  #   :user_name  => "yomobi.test",
  #   :password  => "y0Yoy@filler",
  #   :authentication  => :plain,
  #   :enable_starttls_auto => true
  # }

  # use sendgrid for real emailing
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.default_url_options = { :host => "local.host:3000" }
  ActionMailer::Base.smtp_settings = {
    :address => "smtp.sendgrid.net",
    :port => '25',
    :domain => "yomobi.com",
    :authentication => :plain,
    :user_name => "yomobi",
    :password => "yoMob1SendGrId"
  }
  config.text_smtp_settings = {
    :address => "smtp.sendgrid.net",
    :port => '25',
    :domain => "yomobi.com",
    :authentication => :plain,
    :user_name => "yomobi_text",
    :password => "ymT3xtsenDgr!d"
  }

  Slim::Engine.set_default_options :pretty => true
end

