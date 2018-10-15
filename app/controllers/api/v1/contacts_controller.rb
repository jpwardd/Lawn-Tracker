class Api::V1::ContactsController < ApplicationController
  def index
    render json: Contact.all
  end

  def create
    @contact = Contact.create(contact_params)
    render json: @contact
  end

  private

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :phone_number, :email, :address, :city, :state, :zip_code) 
  end
end