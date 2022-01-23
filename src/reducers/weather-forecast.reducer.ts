import types from '../controllers/types';
import { type ForecastResponse } from '../controllers/weather-forecast.controller';

export default (state = {} as ForecastResponse, action: { type: string; payload: ForecastResponse; }) => {
  switch (action.type) {
    case types.LOAD_WEATHER_FORECAST:
      return action.payload;
    default:
      return state;
  }
};