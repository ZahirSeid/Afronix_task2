import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainContent from './components/MainContent';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8080/api/current_weather/', {
          city_name: 'Addis Ababa'
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="bg-[#100E1D] flex flex-col lg:flex-row">
      <MainContent weatherData={weatherData} />
    </div>
  );
};

export default App;
