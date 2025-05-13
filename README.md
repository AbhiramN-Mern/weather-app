# Weather Application

## Description
A simple mobile-friendly weather application that fetches weather information from the [OpenWeatherMap API](https://openweathermap.org/). The app displays current weather details like temperature, weather description, and an icon representing the weather condition. It also stores historical weather data in a MongoDB database and allows users to view the history in a table with filters, including location and date range.

## Features
- **Fetch weather data** using the OpenWeatherMap API.
- **Responsive UI** designed for mobile-friendly use.
- **Current weather details**: Temperature, weather description, and weather icons.
- **Error handling** for network requests.
- **Historical data view**: Filter by location (Delhi, Moscow, Paris, New York, Sydney, Riyadh) and date range.
- **Location filter** and **date range filter**: Display historical data for user-specified locations and dates.
- **Validations**: Date range should not exceed 30 days.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, EJS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **API**: OpenWeatherMap API

## Requirements
1. **Node.js** - Install the latest stable version of [Node.js](https://nodejs.org/en/download/).
2. **MongoDB** - Ensure MongoDB is installed and running locally, or use a cloud MongoDB database like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. **OpenWeatherMap API Key** - Sign up at [OpenWeatherMap](https://openweathermap.org/) and get your free API key.

## Setup

### 1. Clone the Repository
```
git clone <repository-url>
cd weather-app
```

## 2. Install Dependencies
Ensure Node.js and npm are installed. Run the following command to install the required dependencies:
```
npm install
```

## 3. Create .env File
In the root of the project, create a .env file with the following content:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/weatherApp
OPENWEATHERMAP_API_KEY=YOUR_API_KEY_HERE
```
Replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key.
 The MONGODB_URI is set for a local MongoDB instance. If using a cloud MongoDB service like MongoDB Atlas, replace it with the provided connection string.
## 4. Start the Application
Run the application with: node app
The app will start on http://localhost:3001.

## 5. Access the Application
Visit http://localhost:3001 in your browser to start using the weather application.

API Endpoints
GET /weather: Fetch the current weather data for a specified location.
POST /weather/history: Store weather data in the database.
GET /weather/history: Retrieve historical weather data with filters for location and date range.
Validation Rules
Date Range: The 'From' and 'To' date range cannot exceed 30 days.
Location: Valid locations are Delhi, Moscow, Paris, New York, Sydney, and Riyadh.
Folder Structure
/weather-app
```
├── /public             # Static files (CSS, JavaScript)
├── /views              # EJS views
│   ├── index.ejs       # Home page
│   └── history.ejs     # History page
├── /models             # Mongoose models
│   └── weather.js      # Weather data model
├── /routes             # Express route handlers
│   ├── weather.js      # Routes for weather data
├── /controllers        # Controller functions
├── /config             # Configuration files
│   └── database.js     # MongoDB connection
├── /middleware         # Custom middleware
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
└── server.js           # Entry point (Server setup)
