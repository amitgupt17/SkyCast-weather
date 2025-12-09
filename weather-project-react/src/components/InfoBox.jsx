import "./InfoBox.css";
import { useEffect, useState } from "react";
// Optional: Add icons if you want them floating next to text
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import AirIcon from '@mui/icons-material/Air'; // For Wind
import VisibilityIcon from '@mui/icons-material/Visibility'; // For Visibility
import WbTwilightIcon from '@mui/icons-material/WbTwilight'; // For Sunset
export default function InfoBox({ info }) {
    const [localTime, setLocalTime] = useState("");
    const [formattedSunrise, setFormattedSunrise] = useState("");
    const [formattedSunset, setFormattedSunset] = useState("");

    const formatTimeWithOffset = (timestamp, timezoneOffset) => {
        const date = timestamp ? new Date(timestamp * 1000) : new Date();
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const cityDate = new Date(utc + (timezoneOffset * 1000));
        return cityDate.toLocaleTimeString('en-US', {
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        });
    };
    const date = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',  // e.g., Tuesday
        day: 'numeric',   // e.g., 9
        month: 'long',    // e.g., December
        year: 'numeric',  // e.g., 2025
    });
    useEffect(() => {
        const updateClock = () => {
            setLocalTime(formatTimeWithOffset(null, info.timezone));
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        if (info.sunrise && info.timezone) {
            setFormattedSunrise(formatTimeWithOffset(info.sunrise, info.timezone));
            setFormattedSunset(formatTimeWithOffset(info.sunset, info.timezone));
        }

        return () => clearInterval(timer);
    }, [info]);
    const getIcon = () => {
        if (info.humidity > 80) return <ThunderstormIcon style={{fontSize: '3rem'}}/>;
        if (info.temp > 20) return <WbSunnyIcon style={{fontSize: '3rem'}}/>;
        if (info.temp < 10) return <AcUnitIcon style={{fontSize: '3rem'}}/>;
        return <CloudIcon style={{fontSize: '3rem'}}/>;
    };
   return (
        <div className="InfoBox">
            <div className="glass-card">
                
                {/* HEADER */}
                <div className="card-header">
                    <div className="header-left">
                        <h2 className="city">
                            <LocationPinIcon /> {info.city}, {info.country}
                        </h2>
                        <p className="date-text">{date}</p>
                        <p className="time-text">{localTime}</p>
                    </div>
                    <div className="header-right">
                        {getIcon()}
                    </div>
                </div>

                {/* MAIN BODY */}
                <div className="card-body">
                    <div className="main-temp">
                        <p className="temp">{Math.round(info.temp)}&deg;C</p>
                        <p className="weather-desc">{info.weather}</p>
                    </div>

                    {/* DETAILS GRID */}
                    <div className="details-grid">
                        <div className="detail-item">
                            <span>Humidity</span>
                            <b>{info.humidity}%</b>
                        </div>
                        <div className="detail-item">
                            <span>Wind <AirIcon fontSize="small"/></span>
                            <b>{info.windSpeed} m/s</b>
                        </div>
                        <div className="detail-item">
                            <span>Visibility <VisibilityIcon fontSize="small"/></span>
                            <b>{info.visibility / 1000} km</b>
                        </div>
                        <div className="detail-item">
                            <span>Feels Like</span>
                            <b>{Math.round(info.feelLike)}&deg;C</b>
                        </div>
                    </div>

                    {/* SUNRISE / SUNSET ROW */}
                    <div className="sun-row">
                        <div className="sun-item">
                            <WbSunnyIcon fontSize="small" style={{color: '#ffeb3b'}}/> 
                            <span> Rise: {formattedSunrise}</span>
                        </div>
                        <div className="sun-item">
                            <WbTwilightIcon fontSize="small" style={{color: '#ff9800'}}/> 
                            <span> Set: {formattedSunset}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

 