require "httparty"

class WeatherParser

  def search(query)
    response = HTTParty.get("https://api.darksky.net/forecast/#{ENV["WEATHER_KEY"]}/37.8267,-122.4233")
  end
end