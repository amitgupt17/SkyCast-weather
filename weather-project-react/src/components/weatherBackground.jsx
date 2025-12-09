import {useState, useEffect} from "react";
import winterDayImg from "../assets/winter.jpg";
import winterNightImg from "../assets/winterNight.jpg";
import summerDayImg from "../assets/hot.jpg";
import summerNightImg from "../assets/summerNight.jpg";
import springDayImg from "../assets/springDay.jpg";
import springNightImg from "../assets/springNight.jpg";
import defaultImg from "../assets/hot.jpg";
import rainImg from "../assets/rain.jpg";
import "./WeatherBacground.css";
export default function WeatherBackground({weatherInfo,children}){
    const [bgImage, setBgImage] = useState(defaultImg);
    useEffect(()=>{
        if(weatherInfo.humidity > 80){
            setBgImage(rainImg);
            return;
        }

        const date = new Date();
        const hour = date.getHours();
        const month = date.getMonth(); // 0=Jan, 11=Dec
        const isDay = hour >= 6 && hour < 18;
        
        
        if (weatherInfo.temp >= 20){
            setBgImage(isDay ?summerDayImg : summerNightImg);
        } else if (weatherInfo.temp<15){
            setBgImage(isDay ? winterDayImg : winterNightImg);

        } else {
            setBgImage(isDay ? springDayImg : springNightImg);
        }
    },[weatherInfo]);

    return (
        <div className="BackgroundImage" 
            style={{backgroundImage:`url(${bgImage})`
        }}>
            {children}
        </div>
    )
}