import React, { useState } from 'react'
import {fetchWeather} from './api/weather'

import './App.css'

const App=()=>
{

    const [q,setQ]=useState("")
    const [weather, setWeather] = useState({});


    const handleChange=(e)=>{
        setQ(e.target.value)
    }

    const search =async (e)=>{
        if(e.key=='Enter')
        {
            const data=await fetchWeather(q)
            setWeather(data)
            setQ('');
        }
    }

    return (
        <div className="main-container">
            <input type="text"className="search" value={q} placeholder="Search..." onChange={handleChange} onKeyPress={search}/>
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App