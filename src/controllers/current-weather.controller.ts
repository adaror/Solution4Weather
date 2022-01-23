import { Dispatch } from "redux";
import actionTypes from './types';
import * as weatherAPI from '../api/weather.api';

export type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  }
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[]
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  }
  clouds: {
    all: number;
  }
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number
  }
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const loadCurrentWeather = async function (dispatch: Dispatch<any>, city: string) {
  try {
    const payload = await weatherAPI.currentWeatherByCityName(city);
    if (!payload) {
      throw Error("Weather API error");
    }
    dispatch({ type: actionTypes.LOAD_CURRENT_WEATHER, payload })
  } catch (e) {
    console.error(e);
    return false
  }
}

export const loadCurrentWeatherByCoords = async function (dispatch: Dispatch<any>, lon: number, lat: number) {
  try {
    const payload = await weatherAPI.currentWeatherByCoords(lon, lat);
    if (!payload) {
      throw Error("Weather API error");
    }
    dispatch({ type: actionTypes.LOAD_CURRENT_WEATHER, payload });
    dispatch({type: actionTypes.INSERT_CITY, cities: [payload.name]});
  } catch (e) {
    console.error(e);
    return false
  }
}