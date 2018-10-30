class Api::V1::CustomersController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }

  def create
    job = Job.new(job_params)

    if customer.save
      render json: { job: job }
    else
      render json: { error: job.errors.full_messages }, status: unprocessable_entity
    end
  end

  private

  def job_params
    params.require(:customer).permit(:customer_id, :user_id, :job_date) 
  end
end