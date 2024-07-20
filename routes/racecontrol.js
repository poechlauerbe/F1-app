const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('racecontrol', {
    title: 'Race Control',
    headline: 'Race Control',
    id: 'race-control',
    script: 'javascript/racecontrol.js',
  });
});

module.exports = router;
