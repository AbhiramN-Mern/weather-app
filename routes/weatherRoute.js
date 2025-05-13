const express = require('express');
const axios = require('axios');
const moment = require('moment');
const Weather = require('../models/weatherScheema');
const router = express.Router();

const cities = {
  'Delhi': { lat: 28.6139, lon: 77.2090 },
  'Moscow': { lat: 55.7558, lon: 37.6173 },
  'Paris': { lat: 48.8566, lon: 2.3522 },
  'New York': { lat: 40.7128, lon: -74.0060 },
  'Sydney': { lat: -33.8688, lon: 151.2093 },
  'Riyadh': { lat: 24.7136, lon: 46.6753 }
};

router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Weather App',
    cities: Object.keys(cities),
    weather: null,
    error: null
  });
});

router.post('/current-weather', async (req, res) => {
  try {
    const location = req.body.location;
    
    if (!cities[location]) {
      return res.render('index', { 
        title: 'Weather App',
        cities: Object.keys(cities),
        weather: null,
        error: 'Invalid location selected'
      });
    }

    const { lat, lon } = cities[location];
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(url);
    const weatherData = {
      location: location,
      date: new Date(),
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      pressure: response.data.main.pressure
    };
    
    const newWeatherData = new Weather(weatherData);
    await newWeatherData.save();
    
    res.render('index', { 
      title: 'Weather App',
      cities: Object.keys(cities),
      weather: weatherData,
      error: null
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.render('index', { 
      title: 'Weather App',
      cities: Object.keys(cities),
      weather: null,
      error: 'Error fetching weather data. Please try again.'
    });
  }
});

// Historical data page
router.get('/historical', (req, res) => {
  res.render('historical', { 
    title: 'Historical Weather Data',
    cities: Object.keys(cities),
    weatherData: null,
    error: null
  });
});


router.post('/historical-data', async (req, res) => {
  try {
    const { location, fromDate, toDate } = req.body;
    
    
    if (!cities[location]) {
      return res.render('historical', { 
        title: 'Historical Weather Data',
        cities: Object.keys(cities),
        weatherData: null,
        error: 'Invalid location selected'
      });
    }
    
    const from = new Date(fromDate);
    const to = new Date(toDate);
    
    const diffDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      return res.render('historical', { 
        title: 'Historical Weather Data',
        cities: Object.keys(cities),
        weatherData: null,
        error: 'Date range cannot exceed 30 days'
      });
    }
    
    if (from > to) {
      return res.render('historical', { 
        title: 'Historical Weather Data',
        cities: Object.keys(cities),
        weatherData: null,
        error: 'From date must be before To date'
      });
    }
    
    to.setHours(23, 59, 59, 999);
    
    // Query database
    const weatherData = await Weather.find({
      location: location,
      date: { $gte: from, $lte: to }
    }).sort({ date: 1 });
    
    const formattedData = weatherData.map(item => {
      return {
        ...item._doc,
        formattedDate: moment(item.date).format('YYYY-MM-DD HH:mm:ss')
      };
    });
    
    res.render('historical', { 
      title: 'Historical Weather Data',
      cities: Object.keys(cities),
      fromDate,
      toDate,
      selectedLocation: location,
      weatherData: formattedData,
      error: null
    });
  } catch (error) {
    console.error('Error fetching historical data:', error);
    res.render('historical', { 
      title: 'Historical Weather Data',
      cities: Object.keys(cities),
      weatherData: null,
      error: 'Error fetching historical data. Please try again.'
    });
  }
});

module.exports = router;