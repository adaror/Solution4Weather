import React from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { type AppState } from '../../store/combiner';
import './weather.scss';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { loadCities } from '../../controllers/cities.controller';
import { loadCurrentWeather, loadCurrentWeatherByCoords } from '../../controllers/current-weather.controller';
import { loadCurrentWeatherForecast } from '../../controllers/weather-forecast.controller';
import WeatherDisplay from './weather-display';
import { toggleDarkMode } from '../../controllers/layout-mode.controller';

const Weather = function() {
  const cities = useSelector(({ cities }: AppState) => (cities), shallowEqual);
  const currentWeather = useSelector(({ currentWeather }: AppState) => (currentWeather), shallowEqual);
  const weatherForecast = useSelector(({ weatherForecast }: AppState) => (weatherForecast), shallowEqual);

  const [selectedCity, setSelectedCity] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    loadCities(dispatch);
  }, [])

  // ask for the user's location - if the users accepts - search for the user's city
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) { return; }
      loadCurrentWeatherByCoords(dispatch, position.coords.longitude, position.coords.latitude);
    })
  }, [])

  // load the entire forecast after weather is finish to load
  React.useEffect(() => {
    if (!currentWeather?.weather) { return; }
    if (!selectedCity && currentWeather.name) { setSelectedCity(currentWeather.name) }
    if (currentWeather.name === selectedCity.toLocaleLowerCase()) { return; }
    if (currentWeather.main.temp < 0) { toggleDarkMode(dispatch, true) }
    else { toggleDarkMode(dispatch, false) }
    loadCurrentWeatherForecast(dispatch, currentWeather.coord.lon, currentWeather.coord.lat)
  }, [currentWeather])

  // checking if the full forecast and the relevant weather is loaded and turn off the loading mode
  React.useEffect(() => {
    if (weatherForecast?.lat !== currentWeather?.coord?.lat) { return; }
    if (weatherForecast?.lon !== currentWeather?.coord?.lon) { return; }
    setLoading(false);
  }, [weatherForecast])

  const onSearchClick = function() {
    setLoading(true);
    loadCurrentWeather(dispatch, selectedCity);
  }

  return (
    <div className='weather-component'>
      <h3 className='header'>Weather Search</h3>
      <Form className='d-flex flex-column align-items-center mt-3'>
        {selectedCity && <span>{`Current City - ${selectedCity}`}</span>}
        <Form.Group className='mt-3 w-75' controlId='weatherSearchForm'>
          <Form.Label>City Name</Form.Label>
          <Row>
            <Col sm="10">
              <Typeahead 
                id='capital-cities'
                defaultSelected={[selectedCity]}
                onChange={(selected) => {
                  if (selected[0]) {
                    setSelectedCity(selected[0] as string);
                  }
                }}
                onInputChange={(val: string) => {
                  setSelectedCity(val);
                }}
                options={cities || []}
              /></Col>
            <Col><Button variant='primary' disabled={!selectedCity} onClick={() => onSearchClick()}>Search</Button></Col>
          </Row>
        </Form.Group>
      </Form>

      <WeatherDisplay isLoading={isLoading} currentWeather={currentWeather} weatherForecast={weatherForecast}/>
    </div>
  )
}

export default Weather;

