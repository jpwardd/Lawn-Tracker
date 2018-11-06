class Api::V1::WeatherController < ApplicationController
  

  def index
    response = WeatherParser.new
    current_weather = response.current_conditions(weather_params)

    render json: current_weather
  end

  private
  def weather_params
    params.permit(:latitude, :longitude, :units)
  end
end