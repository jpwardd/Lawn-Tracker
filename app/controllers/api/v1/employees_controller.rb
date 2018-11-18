class Api::V1::EmployeesController < ApplicationController
   protect_from_forgery unless: -> { request.format.json? }
  
  def index
  
  
    render json: Employee.where(user: current_user)
  end

  def create
    employee = Employee.new(employee_params)
    employee.user = current_user
    if employee.save
      render json: employee
    else
      render json: { error: employee.errors.full_messages }, status: unprocessable_entity
    end
  end

  def update
    employee = Employee.find(employee_params[:id])
    employee.user = current_user
    
    if employee.update(employee_params)
		  render json: employee
		end
  end
 
  def destroy
    Employee.destroy(params[:id])
  end
  private

  def employee_params
    params.permit(:id, :first_name, :last_name, :email, :password, :user_id, :job_id, user: current_user) 
  end
end