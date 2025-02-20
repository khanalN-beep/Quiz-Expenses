import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

function Weather() {
    const inputRef = useRef()
  const [weatherdata, setWeatherData] = useState(false);

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": wind_icon,
    "50n": wind_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=832f6c88e21704c40e165da22b210958`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcon[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <>
      <div className="app">
        <div className="weather">
          <div className="searchbar">
            <input ref={inputRef} type="text" placeholder="search" />
            <img src={search_icon} alt="" onClick={()=> search(inputRef.current.value)}/>
          </div>
          <img
            src={weatherdata?.icon || clear_icon}
            alt=""
            className="weather-icon"
          />
          <p className="temprature">{weatherdata?.temprature}°C</p>
          <p className="location">{weatherdata?.location}</p>
          <div className="weather-data">
            <div className="cold">
              <img src={humidity_icon} alt="" />
              <div>
                <p> {weatherdata?.humidity}% </p>
                <span> humidity</span>
              </div>
            </div>
            <div className="wind">
              <img src={wind_icon} alt="" />
              <div>
                <p> {weatherdata?.windSpeed} m/s </p>
                <span> Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
