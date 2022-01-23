import config from '../config';
import { jsonResponseParser } from '../helpers/json-response-parser';
import { type WeatherResponse } from '../controllers/current-weather.controller';
import { type ForecastResponse } from '../controllers/weather-forecast.controller';

export const currentWeatherByCityName = function(city: string):  Promise<WeatherResponse | undefined> {
  return jsonResponseParser(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.weatherAPIKey}&units=metric`), () => undefined);
}

export const currentWeatherByCoords = function(lon: number, lat: number):  Promise<WeatherResponse | undefined> {
  return jsonResponseParser(fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.weatherAPIKey}&units=metric`), () => undefined);
}

export const forecastByCoords = function(lon: number, lat: number): Promise<ForecastResponse | undefined> {
  return jsonResponseParser(fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${config.weatherAPIKey}&units=metric`)
    , () => undefined);
}