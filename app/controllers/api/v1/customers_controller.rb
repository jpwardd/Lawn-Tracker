class Api::V1::CustomersController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Customer.all.order(:first_name)
  end

  def show
		customers = Customer.find(params[:id])
		render json: customers
	end

  def create
    customer = Customer.new(customer_params)
    if customer.save
      render json: { customer: customer }
    else
      render json: { error: customer.errors.full_messages }, status: unprocessable_entity
    end
  end

  def update
    review = Customer.find(params[:id])

    if review.update(review_params)
		  render json: review
		end
  end

def destroy
  Customer.destroy(params[:id])
end

  private

  def customer_params
    params.require(:customer).permit(:first_name, :last_name, :phone_number, :email, :address, :city, :state, :zip_code, :notes) 
  end
end