/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import './weather-display.scss';
import { Form, Col, Card, Spinner } from "react-bootstrap";
import { type WeatherResponse } from '../../../controllers/current-weather.controller';
import { type ForecastResponse } from '../../../controllers/weather-forecast.controller';

type WeatherDisplayProps = {
	isLoading: boolean;
	currentWeather: WeatherResponse | undefined;
	weatherForecast: ForecastResponse | undefined;
}

type WeatherBoxPops = {
	icon?: string;
	temp?: number;
	humidity?: number;
	visibility?: number | null;
	windSpeed?: number;
}

enum Selections { CURRENT = "current", ONE_HOUR = "oneHour", TWO_HOURS = "twoHours", WEEKLY = "week" }
 
const WEATHER_DISPLAT_OPTIONS = [{key: "current", value: "Current", isDefault: true}, {key: "oneHour", value: "One Hour"}, 
  {key: "twoHours", value: "Two Hours"}, {key: "week", value: "Weekly"}]

const WeatherBox = function(props: WeatherBoxPops) {
  return (
    <Card className="card">
      <Card.Img variant="top" src={`http://openweathermap.org/img/w/${props.icon}.png`}/>
      <Card.Body>
        { props.temp && <Card.Title>{`${Math.round(props.temp)}°`}</Card.Title> }
        { props.humidity && <Card.Text>{`Humidity: ${props.humidity}%`}</Card.Text>}
        { props.visibility && <Card.Text>{`Visibility: ${props.visibility / 1000}km`}</Card.Text> }
        { props.windSpeed && <Card.Text>{`Wind Speed: ${props.windSpeed}m/s`}</Card.Text> }
      </Card.Body>
    </Card>
  )
}

const WeatherDisplay = function(props: WeatherDisplayProps) {
  const [selectedDisplay, setSelectedDisplay] = React.useState("current");
  const [hourlyWeather, setHourlyWeather] = React.useState<JSX.Element[]>([]);
  const [weeklyWeather, setWeeklyWeather] = React.useState<JSX.Element[]>([]);

  // rendering the weather boxes for hourly and weekly for every city change
  React.useEffect(() => {
    if (!props.currentWeather?.weather) { return; }
    if (!props.weatherForecast?.daily) { return; }
    const hourlyWeather = props.weatherForecast.hourly.map((forecast, i) => 
      <WeatherBox key={i} icon={forecast.weather[0].icon}
	  temp={forecast.temp} humidity={forecast.humidity}
	  visibility={forecast.visibility} windSpeed={forecast.wind_speed}
      />)

	  const weeklyWeather = props.weatherForecast.daily.map((forecast, i) => 
      <WeatherBox key={i} icon={forecast.weather[0].icon}
  		temp={forecast.temp.day} humidity={forecast.humidity}
  		visibility={null} windSpeed={forecast.wind_speed}
      />)
    setHourlyWeather(hourlyWeather);
    setWeeklyWeather(weeklyWeather);
  }, [props.currentWeather, props.weatherForecast])
  
  const generateWeatherBoxes = function() {
    if (!hourlyWeather.length) { return null; }
    
    switch (selectedDisplay) {
      case Selections.CURRENT:
        return <WeatherBox 
          icon={props.currentWeather?.weather?.[0].icon}
          temp={props.currentWeather?.main?.temp}
          humidity={props.currentWeather?.main?.humidity}
          visibility={props.currentWeather?.visibility}
          windSpeed={props.currentWeather?.wind?.speed}
			  /> 
      case Selections.ONE_HOUR:
        return hourlyWeather[0];
	  case Selections.TWO_HOURS: 
        return hourlyWeather.slice(0, 2);
	  case Selections.WEEKLY:
		  return weeklyWeather; 
      default: return null;
    }
  }

  if (props.isLoading) {
	  return (
      <div className="spinner d-flex justify-content-center mt-60">
        <Spinner animation="border" role="status" />
      </div>
	  )
  }

  return (
    <div className="weather-display">
      <Col md="2">
        {props.currentWeather?.base && <Form.Select defaultValue={selectedDisplay} onChange={(e) => {setSelectedDisplay(e.target.value)} }>
          {WEATHER_DISPLAT_OPTIONS.map((option, i) => <option key={i} value={option.key}>
            {option.value}</option>)}
        </Form.Select> }
      </Col>
      <div className="d-flex justify-content-around">
        {
          generateWeatherBoxes()
        }
      </div>
    </div>
  )
}

export default WeatherDisplay;