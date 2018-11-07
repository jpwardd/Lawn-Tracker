class Api::V1::JobsController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }
  

  def index
  
    render json: Job.all
  end

  def create

    job = Job.new(job_params)

    if job.save
      render json: job
    else
      render json: { error: job.errors.full_messages }, status: unprocessable_entity
    end
  end
  
  def update

    job = Job.find(job_params[:job_id])


    job.attributes = {
      name: job_params[:name],
      customer_id: job_params[:customer_id],
      notes: job_params[:notes],
      job_date: job_params[:job_date],
      user_id: job_params[:user_id],
    }

    if job.save
		  render json: job
		end
  end

  def destroy
    Job.destroy(params[:id])
  end
  private

  def job_params
    params.permit(:job_id, :name, :customer_id, :notes, :job_date, :user_id) 
  end
end