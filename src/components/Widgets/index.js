import React, { useEffect } from 'react';
import './widgets.css';
const WeatherWidget = ({cityid}) => {
  useEffect(() => {
    if (!window.myWidgetParam) {
      window.myWidgetParam = [];
    }
    window.myWidgetParam.push({
      id: 15,
      cityid: cityid.toString(),
      appid: '9bcd1353025757509e1aa254f5c102b5',
      units: 'metric',
      containerid: 'openweathermap-widget-11'
    });
    const script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src = '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';
    const parent = document.getElementById('openweathermap-widget-11');
    parent.appendChild(script);
    return () => {
      parent.innerHTML = '';
    };
  }, [cityid]);

  return (
    <div id="openweathermap-widget-11" className="weather-widget"></div>
  );
};

export default WeatherWidget;