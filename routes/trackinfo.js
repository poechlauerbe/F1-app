const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('page01', {
    title: 'Track Info',
    headline: 'Track Info',
    id: 'trackinfo',
    preScript: 'https://unpkg.com/leaflet/dist/leaflet.js',
    script: 'javascript/trackinfo.js'
  });
});

module.exports = router;
