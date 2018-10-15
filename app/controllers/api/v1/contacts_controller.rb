class Api::V1::ContactsController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Contact.all
  end

  def create
    contact = Contact.new(contact_params)

    if contact.save
      render json: { contact: contact }
    else
      render json: { error: contact.errors.full_messages }, status: unprocessable_entity
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :phone_number, :email, :address, :city, :state, :zip_code) 
  end
end