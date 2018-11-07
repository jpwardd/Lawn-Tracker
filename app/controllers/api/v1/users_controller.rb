class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  prepend_before_action(only: [:index, :destroy]) { request.env["devise.skip_timeout"] = true }

  before_action :authenticate_user!, only: [:destroy]

  def index
    render json: current_user
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    yield if block_given?
    respond_to_on_destroy
  end
end