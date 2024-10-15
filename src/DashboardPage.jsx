import React, { useEffect, useState } from 'react';

function DashboardPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');

  // useEffect(() => {
  //   fetch(
  //     'https://www.meteosource.com/api/v1/free/point?place_id=kyiv&sections=all&timezone=Europe/Kiev&language=en&units=metric&key=7b1pxnaca870skynbqh7lluk1c10k2kskedebdwf'
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const dailyForecast = data.daily.data.slice(0, 5);
  //       setWeatherData(dailyForecast);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching weather data:', error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeather, handleError);
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    const fetchWeather = (position) => {
      const { latitude, longitude } = position.coords;

      // const latitude = 50.4546600;
      // const longitude = 30.5238000;

      const apiKey = '7b1pxnaca870skynbqh7lluk1c10k2kskedebdwf';
      const url = `https://www.meteosource.com/api/v1/free/point?lat=${latitude}&lon=${longitude}&sections=all&timezone=Europe/Kiev&language=en&units=metric&key=${apiKey}`;

      console.log(latitude, longitude);

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const dailyForecast = data.daily.data.slice(0, 5);
          setWeatherData(dailyForecast);
          console.log(dailyForecast);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        });

      const locationUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      
      fetch(locationUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address) {
            if(data.address.city) {
              setCityName(data.address.city);
            }
            else {
              setCityName(data.address.district);
            }
            setCountryName(data.address.country);
          }
        })
        .catch((error) => {
          console.error('Error fetching location data:', error);
        });
    };

    const handleError = (error) => {
      console.error('Error getting location:', error);
      setLoading(false);
    };

    getLocation();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2 id="city">{cityName}, <span>{countryName}</span></h2>
      <div className="flex">
        {weatherData.map((day, index) => (
          <WeatherCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
}

function WeatherCard({ day }) {
  const { all_day, summary } = day;

  return (
    <div className="weather-card">
      <h3 className="weather-card-title">
        {new Date(day.day).toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
        })}
      </h3>

      <img
        src={`https://www.meteosource.com/static/img/ico/weather/${all_day.icon}.svg`}
        alt={all_day.weather}
        className="weather-icon"
      />

      <p className="weather-summary">Summary: {summary.split('. ')[0].charAt(0).toLowerCase() + summary.split('. ')[0].slice(1)}</p>

      <p>Max: {all_day.temperature_max}°C</p>
      <p>Min: {all_day.temperature_min}°C</p>

      <p className="centered-flex">
        <span className="wind-arrow" style={{ '--wind-angle': all_day.wind.angle }}>
          ←
        </span>
        {Math.round(all_day.wind.speed * 3.6)} km/h
      </p>


      <p>Humidity: {all_day.cloud_cover.total}%</p>
      <p>Precipitation: {all_day.precipitation.total} mm</p>
    </div>
  );
}

export default DashboardPage;