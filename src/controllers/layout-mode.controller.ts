import { Dispatch } from "redux";
import actionTypes from './types';

export const toggleDarkMode = function(dispatch: Dispatch<any>, isDarkMode: boolean) {
  dispatch({ type: actionTypes.TOGGLE_DARK_MODE, isDarkMode });
}