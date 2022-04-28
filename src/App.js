import React, { useState } from "react";
import axios from "axios";

import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  let weatherData = {
    city: "London",
    date: "Wednesday, 13 April 2022, 13:43",
    description: "Mostly Sunny",
    imgUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    maxTemp: "20",
    humidity: "5",
    windSpeed: "4",
    temperature: "19",
  };

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      maxTemp: response.data.main.temp_max,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  if (loaded) {
    return (
      <div className="weather-app">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search for a city"
            autoFocus="on"
            autoComplete="off"
            className="text-input"
            onChange={updateCity}
          />
          <input type="submit" value="Search" className="search" />
          <input type="submit" value="Current" className="location-button" />
        </form>
        <br />
        <div className="overview">
          <ul>
            <li className="date">{weatherData.date} </li>
            <li className="description"> {weatherData.description}</li>
          </ul>
        </div>

        <h1>{city}</h1>

        <div className="row">
          <div className="col-6">
            <div className="clear-fix weather-temperature">
              <img
                src={weather.icon}
                alt={weather.description}
                className="float-left"
              />
              <div className="float-left">
                <strong className="temperature">
                  <span className="units">
                    {Math.round(weather.temperature)}°C
                  </span>
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4">Max Temp: {Math.round(weather.maxTemp)}°C</div>
          <div className="col-4">Humidity: {weather.humidity}%</div>
          <div className="col-4">Wind: {weather.wind}m/h</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="container">
          <div className="weather-app-wrapper">
            <div className="weather-app">
              <form className="search-form" onSubmit={handleSubmit}>
                <input
                  type="search"
                  placeholder="Search for a city"
                  autoFocus="on"
                  autoComplete="off"
                  className="text-input"
                  onChange={updateCity}
                />
                <input type="submit" value="Search" className="search" />
                <input
                  type="submit"
                  value="Current"
                  className="location-button"
                />
              </form>
              <br />
              <div className="overview">
                <ul>
                  <li className="date">{weatherData.date} </li>
                  <li className="description"> {weatherData.description}</li>
                </ul>
              </div>

              <h1>{weatherData.city}</h1>

              <div className="row">
                <div className="col-6">
                  <div className="clear-fix weather-temperature">
                    <img
                      src={weatherData.imgUrl}
                      alt={weatherData.description}
                      className="float-left"
                    />
                    <div className="float-left">
                      <strong className="temperature">
                        <span className="units">
                          {weatherData.temperature}°C
                        </span>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">Max Temp: {weatherData.maxTemp}°C</div>
                <div className="col-4">Humidity: {weatherData.humidity}%</div>
                <div className="col-4">Wind: {weatherData.windSpeed}m/h</div>
              </div>
            </div>
          </div>
        </div>
        <p>
          {" "}
          <a href="https://github.com/AminaKhan91/weather-app-react-">
            {" "}
            Open source code
          </a>
          by Amina Khan
        </p>
      </div>
    );
  }
}
