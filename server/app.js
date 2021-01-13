const express = require('express');
const axios = require('axios').default;

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`SERVER STARTED ON PORT ${PORT}`));

app.get('/api/rates', async (req, res) => {
  try {
    const base = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=${req.query.base}`,
    );
    const rates = await axios.get(
      `https://api.exchangeratesapi.io/latest?symbols=${req.query.currency}`,
    );
    res.status(200).json({
      "results": {
        "base": `${base.data.base}`,
        "date": `${base.data.date}`,
        "rates": {
          ...rates.data.rates
        }
      }
    })
  } catch (error) {
    res.status(400).json({ message: 'an error occurred'})
  }
});

