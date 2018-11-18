class Api::V1::JobsController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }
  

  def index
  
  
    render json: Job.where(user: current_user)
  end

  def create
    job = Job.new(job_params)
    job.user = current_user
    if job.save
      render json: job
    else
      render json: { error: job.errors.full_messages }, status: unprocessable_entity
    end
  end
  
  def update
    job = Job.find(job_params[:id])
    job.user = current_user
    
    if job.update(job_params)
		  render json: job
		end
  end

  def destroy
    Job.destroy(params[:id])
  end
  private

  def job_params
    params.permit(:id, :customer_id, :job_date, :notes, :user_id, :employee_id, user: current_user) 
  end
end