const express = require('express');
const axios = require('axios');
const router = express.Router();

const HUMIDITY_SERVICE = process.env.HUMIDITY_SERVICE_URL;

router.get('/:city', async (req, res) => {
  try {
    const response = await axios.get(`${HUMIDITY_SERVICE}/humidity/${req.params.city}`);
    res.json(response.data);
  } catch (error) {
    handleError(res, error, 'humidité');
  }
});

router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${HUMIDITY_SERVICE}/humidity`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    handleError(res, error, 'humidité');
  }
});

function handleError(res, error, serviceName) {
  console.error(`Erreur avec le service ${serviceName}:`, error.message);
  const status = error.response?.status || 500;
  const message = error.response?.data?.error || `Erreur interne du serveur (${serviceName})`;
  res.status(status).json({ error: message });
}

module.exports = router;
