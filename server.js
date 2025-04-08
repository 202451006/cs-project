const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // allow requests from your frontend
app.use(express.json()); // to parse JSON in POST requests

app.post('/book', (req, res) => {
  const bookingData = req.body;
  console.log('Received booking:', bookingData);
  
  // You can store this in a database later
  res.json({ message: '🎉 Booking successful! We’ll contact you soon.' });
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
