import { Dispatch } from "redux";
import actionTypes from './types';
import capitalCities from '../helpers/capital-cities';

export const loadCities = function(dispatch: Dispatch<any>) {
  const cities = capitalCities.map((city) => city.city).filter((city) => city);
  dispatch({ type: actionTypes.LOAD_CITIES, cities });
}