class ApplicationController < ActionController::Base 
protect_from_forgery with: :exception 
after_action :add_csrf_token_to_json_request_header 

private 

def add_csrf_token_to_json_request_header 
  if request.xhr? && !request.get? && protect_against_forgery? 
    response.headers['X-CSRF-Token'] = form_authenticity_token 
  end
end 

end 


