
const actionTypes = {
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
  LOAD_CITIES: "LOAD_CITIES",
  INSERT_CITY: "INSERT_CITY",
  LOAD_CURRENT_WEATHER: "LOAD_CURRENT_WEATHER",
  LOAD_WEATHER_FORECAST: "LOAD_WEATHER_FORECAST"
}

export type Reducer<State, Payload = any> = (state: State, action: { type: keyof typeof actionTypes; payload: Payload }) => State

export default actionTypes;
