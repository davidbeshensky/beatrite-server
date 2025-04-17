const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/device-data', express.text({ type: '*/*' }));

app.post('/device-data', (req, res) => {
  let data;
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (err) {
    console.log('Failed to parse JSON, using raw string.');
    data = req.body;
  }

  console.log('Received data:', data);
  res.send({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
