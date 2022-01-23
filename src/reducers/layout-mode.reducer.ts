import types from '../controllers/types';

export default (state = false, action: { type: string; isDarkMode: boolean; }) => {
  switch (action.type) {
    case types.TOGGLE_DARK_MODE:
      return action.isDarkMode;
    default:
      return state;
  }
};