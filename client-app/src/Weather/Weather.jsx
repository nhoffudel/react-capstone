import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";

function Weather (){
  const [weatherState, setWeatherState] = useState();
  const apikey = "8e8a55d273cb4d12be5141335212809";
  function getWeather(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          axios.get(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`)
          .then(response => {
           setWeatherState(response.data);
          })
        })
  } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }

    useEffect(() => getWeather(), [])
    if (!navigator.geolocation){
      return (
        <div>
          Unable to access location for weather.
        </div>
      )
    }
    if (!weatherState){
      return (
        <div>
          Loading weather...
        </div>
      )
    }
    return (
      <div>
        <p>The weather in {weatherState.location.name}, {weatherState.location.region} is {weatherState.current.temp_f}F and {weatherState.current.condition.text.toLowerCase()} with wind at {weatherState.current.wind_mph}MPH from the {weatherState.current.wind_dir}.
        It feels like {weatherState.current.feelslike_f}F.</p>
      </div>
    );
}

export default Weather;