const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Use express.raw() for all content types (we'll try to parse manually)
app.use('/device-data', express.raw({ type: '*/*' }));

app.post('/device-data', (req, res) => {
  let data;

  try {
    // Try parsing the raw buffer as JSON
    const bodyString = req.body.toString('utf8');
    data = JSON.parse(bodyString);
  } catch (err) {
    console.log('Could not parse JSON:', err.message);
    data = { error: 'Invalid JSON received', raw: req.body.toString('utf8') };
  }

  console.log('Received data:', data);
  res.send({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
