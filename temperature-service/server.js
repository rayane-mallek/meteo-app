const express = require('express');
const mongoose = require('mongoose');
const Temperature = require('./models/temperature');

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/temperatures';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

app.get('/temperature', async (req, res) => {
  try {
    const temperatures = await Temperature.find().sort({ recordedAt: -1 });
    res.json(temperatures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur' });
  }
});

app.get('/temperature/:city', async (req, res) => {
  try {
    const temperature = await Temperature.findOne({ city: req.params.city })
      .sort({ recordedAt: -1 });

    if (!temperature) {
      return res.status(404).json({ message: 'Aucune température trouvée pour cette ville' });
    }

    res.json(temperature);
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur' });
  }
});

app.post('/temperature', async (req, res) => {
  try {
    const { city, value } = req.body;
    const temperature = new Temperature({ city, value });
    await temperature.save();
    res.status(201).json(temperature);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la température' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Service de températures en écoute sur le port ${PORT}`);
});
