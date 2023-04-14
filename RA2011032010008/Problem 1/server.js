const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.get('/train-schedule', async (req, res) => {
  try {
    // Make API call to external server
    const response = await axios.get('http://localhost:3000');
    const trainScheduleData = response.data;

    // Format the response
    const formattedData = {
      trains: trainScheduleData.trains.map(train => {
        return {
          name: train.name,
          departureTime: train.departureTime,
          arrivalTime: train.arrivalTime
        }
      })
    };

    // Send the response to Postman
    res.json(formattedData);
  } catch (error) {
    // Handle error
    res.status(500).json({ error: 'Failed to fetch train schedule data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});