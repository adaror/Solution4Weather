import types from '../controllers/types';
import { type WeatherResponse } from '../controllers/current-weather.controller';

export default (state = {} as WeatherResponse, action: { type: string; payload: WeatherResponse; }) => {
  switch (action.type) {
    case types.LOAD_CURRENT_WEATHER:
      return action.payload;
    default:
      return state;
  }
};