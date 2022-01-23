import citiesReducer from '../reducers/cities.reducer';
import currentWeatherReducer from '../reducers/current-weather.reducer';
import weatherForecastReducer from '../reducers/weather-forecast.reducer';
import layoutModeReducer from '../reducers/layout-mode.reducer';

import { combineReducers } from "redux";

const reducers = {
  cities: citiesReducer,
  currentWeather: currentWeatherReducer,
  weatherForecast: weatherForecastReducer,
  layoutMode: layoutModeReducer
}
  
export type AppState = {
	cities: Parameters<typeof citiesReducer>[0];
	currentWeather: Parameters<typeof currentWeatherReducer>[0];
	weatherForecast: Parameters<typeof weatherForecastReducer>[0];
	layoutMode: Parameters<typeof layoutModeReducer>[0];
}

export default combineReducers(reducers);
