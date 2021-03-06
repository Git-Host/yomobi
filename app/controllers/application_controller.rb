class ApplicationController < ActionController::Base
  protect_from_forgery
  include UrlHelper

  before_filter :ensure_domain, :set_locale

  def error(status = 400, reason)
    render :text => reason.to_json, :status => status
  end
  
  def success(status = 200, data)
    render :json => (data || {}).to_json, :status => status
  end
  
  def couch_url(db_name=nil,db_pass=nil)
    # This is so company.rb can use this method too, albeit ugly
    ApplicationController::couch_url(db_name,db_pass)
  end

  def self.couch_url(db_name=nil,db_pass=nil)
    couch_host = Rails.application.config.couch_host
    return "http://#{couch_host}" if db_name.nil?
    return "http://#{couch_host}/#{db_name}" if db_name == '_users'
    return "http://#{couch_host}/m_#{db_name}" if db_pass.nil?

    if db_pass == :@admin
      user, pass = Rails.application.config.couch_cred
      return "http://#{user}:#{pass}@#{couch_host}/m_#{db_name}"
    end
    "http://admin_#{db_name}:#{db_pass}@#{couch_host}/m_#{db_name}"
  end
  
  def prevent_caching
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end

  def email_regex
    ValidatesAsEmailAddress::RFC822::EmailAddress
  end

  def phone_valid?(phone)
    phone.length < 50
  end

  # devise
  def after_sign_in_path_for(resource)
    return account_setup_path(1) if resource.company.nil?
    '/builder/main'
  end

  def ensure_user_has_already_setup
    return redirect_to(confirm_account_path) if !current_user.confirmed_at?
    return redirect_to(account_setup_path 1) if current_user.company.nil?
  end

  def redirect_unless_confirmed
    return redirect_to confirm_account_path unless current_user.confirmed_at?
  end

  def ensure_domain
    return unless Rails.env.production?
    if request.env['HTTP_HOST'] =~ /^yomobi.com/
      # HTTP 301 is a "permanent" redirect
      url = "http://www.yomobi.com#{ request.env['PATH_INFO'] }"
      url += '?' + request.env['QUERY_STRING'] if request.env['QUERY_STRING'].length > 0
      redirect_to url, :status => 301
    end
  end

  def set_locale
    # Do the language check here since we support limited languages and
    # checking here is faster than a file system check.
    lang = http_accept_language.preferred_language_from I18n.available_locales
    lang ||= http_accept_language.compatible_language_from I18n.available_locales

    if params[:locale].present? && params[:locale].match(/^(es|en|fr)/)
      cookies[:locale] = params[:locale]
    end

    I18n.locale = cookies[:locale] || lang || I18n.default_locale
  end

  def default_url_options(options={})
    if I18n.locale != :en
      { :locale => I18n.locale }
    else
      {}
    end
  end

  def restrict_test_account
    if current_user.test_user?
      redirect_to builder_main_path, notice: (t'account.restrict_test_account')
    end
  end

end
