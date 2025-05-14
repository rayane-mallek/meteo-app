const express = require('express');
const cors = require('cors');
const temperatureRouter = require('./routes/temperature');
const humidityRouter = require('./routes/humidity');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/temperature', temperatureRouter);
app.use('/api/humidity', humidityRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend service running on port ${PORT}`);
});
