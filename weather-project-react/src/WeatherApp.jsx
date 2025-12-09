import { useState,useEffect } from "react";
import InfoBox from "./components/InfoBox.jsx";
import SearchBox from "./components/SearchBox.jsx";
import WeatherBackground from "./components/weatherBackground.jsx"; // Ensure Capital 'W' matches your file!
import "./WeatherApp.css";

export default function WeatherApp() {

    // DEFAULT DATA (Updated to include all fields needed for your new UI)
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Kanpur",
        country: "IN",
        temp: 24.05,
        tempMin: 24.05,
        tempMax: 24.05,
        humidity: 47,
        feelLike: 23.8,
        weather: "haze",
        pressure: 1012,
        windSpeed: 3.5,
        visibility: 10000,      // In meters
        timezone: 19800,        // UTC offset in seconds (19800 = IST)
        sunrise: 1702949452,    // Valid UNIX timestamp
        sunset: 1702987823,     // Valid UNIX timestamp
    });

    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };
    
    useEffect(() => {
        const fetchDefaultWeather = async () => {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const API_URL = import.meta.env.VITE_API_URL;
            
            try {
                // Fetch Weather
                let response = await fetch(`${API_URL}/weather?q=Kanpur&appid=${API_KEY}&units=metric`);
                let data = await response.json();
                
                // (Optional) If you want AQI on startup too, you would need a second fetch here like in SearchBox
                
                setWeatherInfo((prevInfo) => ({
                    ...prevInfo, // Keep existing fields (like AQI) if this fetch doesn't update them
                    city: data.name,
                    country: data.sys.country,
                    temp: data.main.temp,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max,
                    humidity: data.main.humidity,
                    feelLike: data.main.feels_like,
                    weather: data.weather[0].description,
                    pressure: data.main.pressure,
                    windSpeed: data.wind.speed,
                    visibility: data.visibility,
                    timezone: data.timezone,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                }));
            } catch (err) {
                console.log("Error fetching default weather:", err);
            }
        };

        fetchDefaultWeather();
    }, []);
    return (
        <WeatherBackground weatherInfo={weatherInfo}>
            <div className="weather-container">
               <h2 className="title">SkyCast</h2>
               <SearchBox updateInfo={updateInfo} />
            
                <InfoBox info={weatherInfo} />
            </div>
            
        </WeatherBackground>
    );
};