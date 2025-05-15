const express = require('express');
const { sequelize, Humidity } = require('./models/humidity');

const app = express();
app.use(express.json());

sequelize.sync()
  .then(() => console.log('Connecté à PostgreSQL'))
  .catch(err => console.error('Erreur de connexion à PostgreSQL:', err));

app.get('/:city', async (req, res) => {
  try {
    const humidity = await Humidity.findOne({
      where: { city: req.params.city },
      order: [['recordedAt', 'DESC']]
    });

    if (!humidity) {
      return res.status(404).json({ message: 'Aucune humidité trouvée pour cette ville' });
    }

    res.json(humidity);
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur' });
  }
});

app.post('/', async (req, res) => {
  try {
    const { city, value } = req.body;
    const humidity = await Humidity.create({ city, value });
    res.status(201).json(humidity);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'humidité' });
  }
});

app.get('/', async (req, res) => {
  try {
    const humidities = await Humidity.findAll({ order: [['recordedAt', 'DESC']] });
    res.json(humidities);
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Service d'humidités en écoute sur le port ${PORT}`);
});
