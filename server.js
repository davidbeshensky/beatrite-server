const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // <-- use Railway-assigned port

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Beatrite server is live!');
});

// Device data route
app.post('/device-data', (req, res) => {
  console.log('Received data:', req.body);
  res.send({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
