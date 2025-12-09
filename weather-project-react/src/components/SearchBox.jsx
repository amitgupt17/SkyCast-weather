import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {

    let [city, setCity] = useState("");
    let [error, setError] = useState(false)
    const apiURL = import.meta.env.VITE_API_URL;
    const apiKEY = import.meta.env.VITE_API_KEY;

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(
                `${apiURL}/weather?q=${city}&appid=${apiKEY}&units=metric`
            );
            let jsonResponse = await response.json();
            console.log(jsonResponse);

            let result = {
                city: city,
                country: jsonResponse.sys.country,
                sunrise: jsonResponse.sys.sunrise,
                sunset: jsonResponse.sys.sunset,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                pressure: jsonResponse.main.pressure,
                windSpeed: jsonResponse.wind.speed,
                timezone: jsonResponse.timezone,
                visibility: jsonResponse.visibility,
            };
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    };
    let handleChange = (event) => {
        setCity(event.target.value);
    };
    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            console.log(city);
            setCity("");
            setError(false);
        } catch (err) {
            setError(true);
        };

    };
    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>

                <TextField
                    id="city"
                    label="Search location"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                    sx={{
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "white" },
                            color: "white"
                        }
                    }}
                />
                
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button 
                    type="submit" 
                    endIcon={<SearchIcon/>}
                ></Button>
                {error && <Alert severity="warning" onClose={() => { setError(false) }} className='button-search'>
                    No such place exists!
                </Alert>}
            </form>
        </div>
    );
}