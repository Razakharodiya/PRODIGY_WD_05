import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = 'ccb8ac5ebb5d0f1386d48f517c4c2036';

    const getWeather = async () => {
        if (city === '') {
            setError('Please enter a city name.');
            return;
        }

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
            setError('');
            changeBackgroundColor(response.data.weather[0].main);
        } catch (err) {
            setError('City not found. Please try again.');
            setWeather(null);
        }
    };

    const changeBackgroundColor = (weatherCondition) => {
        let bgColor;
        switch (weatherCondition.toLowerCase()) {
            case 'clear':
                bgColor = 'linear-gradient(to bottom, #f7b733, #fc4a1a)'; // Sunny
                break;
            case 'clouds':
                bgColor = 'linear-gradient(to bottom, #757f9a, #d7dde8)'; // Cloudy
                break;
            case 'rain':
                bgColor = 'linear-gradient(to bottom, #005bea, #00c6fb)'; // Rainy
                break;
            case 'snow':
                bgColor = 'linear-gradient(to bottom, #e6dada, #274046)'; // Snowy
                break;
            case 'thunderstorm':
                bgColor = 'linear-gradient(to bottom, #141e30, #243b55)'; // Stormy
                break;
            default:
                bgColor = 'linear-gradient(to bottom, #00c6ff, #0072ff)'; // Default
                break;
        }
        document.body.style.background = bgColor;
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeather}>Get Weather</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
