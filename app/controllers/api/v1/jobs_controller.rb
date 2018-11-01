class Api::V1::JobsController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }

  def index
  
    render json: Job.all
  end

  def create
    binding.pry
    job = Job.new(job_params)

    if job.save
      render json: { job: job }
    else
      render json: { error: job.errors.full_messages }, status: unprocessable_entity
    end
  end

  private

  def job_params
    params.permit(:id, :customer_id, :user_id, :job_date) 
  end
end