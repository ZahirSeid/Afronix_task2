import React, { useState, useEffect } from "react";
import axios from "axios";
import humidityImage from '../assets/images/humidity.png';
import windImage from '../assets/images/wind.png';
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";

interface MainContentProps {
  weatherData: {
    main: {
      humidity: number;
      temp: number; // Assuming temperature is part of main object
      // Add other properties of the main object if needed
    };
    weather: {
      description: string;
      main: string;
      // Add other properties of the weather object if needed
    }[];
    wind: {
      speed: number;
      // Add other properties of the wind object if needed
    };
    // Add other necessary properties
  } | null;
}

const MainContent: React.FC<MainContentProps> = ({ weatherData }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch weather data for Addis Ababa when component mounts
    fetchWeatherDataByCity("Addis Ababa");
  }, []);

  const [currentWeatherData, setCurrentWeatherData] = useState(weatherData);

  const fetchWeatherDataByCity = async (city: string) => {
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/current_weather/", {
        city_name: city,
      });
      setCurrentWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Weather icon mapping function
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      // Add more cases for other weather conditions
      default:
        return "❓";
    }
  };

  return (
    <div className="text-gray-150 p-10 flex-grow">
      {loading ? (
        <p>Loading...</p>
      ) : currentWeatherData ? (
        <>
          <LargeCard
            title="Current Weather"
            num={currentWeatherData.main.temp}
            desc={`${currentWeatherData.main.temp}°C, ${currentWeatherData.weather[0].description}`}
          >
            <div className="flex justify-between space-x-5 items-center">
              <div className="bg-gray-500 rounded-full w-[30px] h-[30px] flex justify-center items-center">
                {getWeatherIcon(currentWeatherData.weather[0].main)}
              </div>
              <p className="text-gray-150 text-sm">
                Wind: {currentWeatherData.wind.speed} m/s
              </p>
            </div>
          </LargeCard>

          {/* Additional weather information cards */}
          <SmallCard
            dayTitle="Humidity"
            img={humidityImage}
            min={0}
            max={100}
            value={currentWeatherData.main.humidity}
          />

          <SmallCard
            dayTitle="Wind Speed"
            img={windImage}
            min={0}
            max={100}
            value={currentWeatherData.wind.speed}
          />
        </>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default MainContent;
