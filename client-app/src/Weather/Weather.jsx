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

    return (
      <div>
        The weather in {weatherState.location.name} is {weatherState.current.temp_f}F and {weatherState.current.condition.text.toLowerCase()}
      </div>
    );
}

export default Weather;