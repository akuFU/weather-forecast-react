const path = require('path');
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const weatherAPI = process.env.REACT_APP_YOUR_WEATHER_API_KEY;
const rapidAPI = process.env.REACT_APP_YOUR_RAPID_API_KEY;

const app = express();


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  console.log("works", weatherAPI, rapidAPI);
  res.json({ weather: weatherAPI, rapid: rapidAPI });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});
