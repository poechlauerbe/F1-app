const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('laptimes', {
    title: 'Lap Times',
    headline: 'Lap Times',
    script: 'javascript/laptimes.js'
  });
});

module.exports = router;
