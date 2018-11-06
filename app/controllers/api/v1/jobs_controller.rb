class Api::V1::JobsController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }

  def index
  
    render json: Job.all
  end

  def create

    job = Job.new(job_params)

    if job.save
      render json: { job: job }
    else
      render json: { error: job.errors.full_messages }, status: unprocessable_entity
    end
  end

  private

  def job_params
    params.permit(:id, :name, :customer_id, :notes, :job_date, :user_id) 
  end
end