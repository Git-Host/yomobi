# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110527042419) do

  create_table "carriers", :force => true do |t|
    t.string   "name"
    t.string   "text_email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "carriers", ["name"], :name => "index_carriers_on_name", :unique => true

  create_table "companies", :force => true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "db_name"
    t.string   "db_pass"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.integer  "logo_file_size"
    t.datetime "logo_updated_at"
  end

  add_index "companies", ["db_name"], :name => "index_companies_on_db_name", :unique => true

  create_table "followers", :force => true do |t|
    t.integer  "company_id"
    t.integer  "carrier_id"
    t.string   "email"
    t.string   "phone"
    t.string   "opt_out_key"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "followers", ["email"], :name => "index_followers_on_email", :unique => true
  add_index "followers", ["opt_out_key"], :name => "index_followers_on_opt_out_key", :unique => true
  add_index "followers", ["phone"], :name => "index_followers_on_phone", :unique => true

  create_table "sigs", :force => true do |t|
    t.string   "email"
    t.integer  "type"
    t.string   "delete_hash"
    t.text     "custom"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                               :default => "", :null => false
    t.string   "encrypted_password",   :limit => 128, :default => "", :null => false
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                       :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "business_type"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
