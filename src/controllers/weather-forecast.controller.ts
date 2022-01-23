import { Dispatch } from "redux";
import actionTypes from './types';
import * as weatherAPI from '../api/weather.api';

type Hourly = {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		}
	],
	pop: number;
}

type Daily = {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	},
	feels_like: {
		day: number;
		night: number;
		eve: number;
		morn: number;
	},
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		}
	],
	clouds: number;
	pop: number;
	uvi: number;
}

export type ForecastResponse = {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	hourly: Hourly[];
	daily: Daily[];
}

export const loadCurrentWeatherForecast = async function (dispatch: Dispatch<any>, lon: number, lat: number) {
  try {
    const payload = await weatherAPI.forecastByCoords(lon, lat);
    if (!payload) {
      throw Error("Weather API error");
    }
    dispatch({ type: actionTypes.LOAD_WEATHER_FORECAST, payload })
  } catch (e) {
    console.error(e);
    return false
  }
}