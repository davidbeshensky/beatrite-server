const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Beatrite server is live!');
});

app.post('/device-data', (req, res) => {
  console.log('Received data:', req.body);
  res.send({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
