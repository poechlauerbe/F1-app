const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('laptimes', {
    title: 'Lap times',
    headline: 'Laptimes',
    script: 'javascript/laptimes.js',
  });
});

module.exports = router;
