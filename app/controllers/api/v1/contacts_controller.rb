class Api::V1::ContactsController < ApplicationController
  def index
    render json: Contact.all
  end
end