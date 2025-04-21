const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/device-data', bodyParser.text({ type: '*/*' }));

app.post('/device-data', (req, res) => {
  let data;

  if (typeof req.body === 'object') {
    data = req.body;
  } else {
    try {
      data = JSON.parse(req.body);
    } catch (err) {
      console.log('Could not parse JSON:', err.message);
      data = { error: 'Invalid JSON received', raw: req.body };
    }
  }

  console.log('Received data:', data);
  res.send({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
