const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/scrape', async (req, res) => {
  const url = 'https://id.hm.com/id_id/ladies/trending-now/style-reload-id.html';

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let productsData = [];

    $('div.product-item').each((i, product) => {
      const nameElement = $(product).find('h3.item-heading');
      const priceElement = $(product).find('span.item-price');

      if (nameElement.length > 0 && priceElement.length > 0) {
        const nameText = nameElement.text().trim();
        const priceText = priceElement.text().trim();

        productsData.push({
          productName: nameText,
          productPrice: priceText,
        });

        console.log(`Name: ${nameText}, Price: ${priceText}`);
      }
    });

    res.json(productsData);
  } catch (error) {
    console.error(`Failed to fetch data from the URL: ${error}`);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
