const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.PARCELS_API_KEY;

app.post('/api/track', async (req, res) => {
  const { tracking_number } = req.body;
  try {
    const post = await axios.post(
      'https://api.parcelsapp.com/shipments/tracking',
      { tracking_number },
      { headers: { Authorization: API_KEY } }
    );
    const uuid = post.data.uuid;
    const get = await axios.get(
      `https://api.parcelsapp.com/shipments/tracking/${uuid}`,
      { headers: { Authorization: API_KEY } }
    );
    res.json(get.data);
  } catch (e) {
    res.status(500).json({ error: e.response?.data || e.message });
  }
});

app.get('/', (req, res) => {
  res.send("🚀 Justin's Tracker-API läuft!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));