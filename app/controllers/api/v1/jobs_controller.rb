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
    
    # job.attributes = {
    #   job_id: job_params[:job_id],
    #   name: job_params[:name],
    #   customer_id: job_params[:customer_id],
    #   notes: job_params[:notes],
    #   job_date: job_params[:job_date],
    #   user_id: job_params[:user_id],
    #   id: job_params[:id],
      
    # }
    
    if job.update(job_params)
		  render json: job
		end
  end

  def destroy
    Job.destroy(params[:id])
  end
  private

  def job_params
    params.permit(:id, :name, :customer_id, :notes, :job_date, :user_id, user: current_user) 
  end
end