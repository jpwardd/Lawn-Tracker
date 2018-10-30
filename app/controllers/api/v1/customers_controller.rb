class Api::V1::CustomersController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Customer.all
  end

  def create
    customer = Customer.new(customer_params)

    if customer.save
      render json: { customer: customer }
    else
      render json: { error: customer.errors.full_messages }, status: unprocessable_entity
    end
  end

  private

  def customer_params
    params.require(:customer).permit(:first_name, :last_name, :phone_number, :email, :address, :city, :state, :zip_code) 
  end
end