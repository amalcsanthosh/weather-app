import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const locations = [
  { name: 'George Town', timeZone: 'Asia/Kuala_Lumpur' },
  { name: 'New York', timeZone: 'America/New_York' },
  { name: 'London', timeZone: 'Europe/London' },
  { name: 'India', timeZone: 'Asia/Kolkata' } 
];
const Weather = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time, timeZone) => {
    return time.toLocaleTimeString('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  const formatDate = (date, timeZone) => {
    return date.toLocaleDateString('en-US', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLocationChange = (e) => {
    const location = locations.find(loc => loc.name === e.target.value);
    setSelectedLocation(location);
  }; 
   const inputRef = useRef()
   const [weatherData,setweatherData]= useState(false)
   const allIcons ={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13d":snow_icon,
   }
  const search=async(city)=>{
    if(city===""){
      alert("Enter City Name")
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;

      const response=await fetch(url);
      const data = await response.json();
      if(!response.ok)
        {
        alert(data.message)
        return;
      }
      console.log(data);
      const icon=allIcons[data.weather[0].icon]|| clear_icon
      setweatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:data.main.temp,
        location:data.name,
        icon: icon
      })
    }catch(error){
      setweatherData(false)
    }
  }
  useEffect(()=>{
    search("");
  },[])
  return (
    <div className='weather'>
        <div className="search-bar">
          <select onChange={handleLocationChange} value={selectedLocation.name}>
            {locations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
            <input ref={inputRef} type="text" placeholder='Search' />
            <img onClick={()=>search(inputRef.current.value)} src={search_icon} alt="" />

        </div>
        <br />
        <div className="current-date">
        {formatDate(currentTime, selectedLocation.timeZone)}
      </div>
      <div className="current-time">
        {formatTime(currentTime, selectedLocation.timeZone)}
      </div>
        {weatherData?<>
        <img src= {weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature} °C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
          <div>
            <p style={{color:'white'}}>{weatherData.humidity}%</p>
            <span style={{color:'white'}}>Humididty</span>
          </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
          <div>
            <p style={{color:'white'}}>{weatherData.windSpeed} Km/h</p>
            <span style={{color:'white'}}>Wind Speed</span>
          </div>
          </div>
        </div>
        </>:<>
        </>}
        
    </div>
  )
}

export default Weather