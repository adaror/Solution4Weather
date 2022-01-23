import types from '../controllers/types';

export default (state = [] as string[], action: { type: string; cities: string[]; }) => {
  switch (action.type) {
    case types.LOAD_CITIES:
      return [...action.cities];
    case types.INSERT_CITY:
      return [...state, ...action.cities];
    default:
      return state;
  }
};