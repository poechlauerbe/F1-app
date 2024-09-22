const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('page01', {
    title: 'Pit Stops',
    headline: 'Pit Stops',
    id: 'pit',
    script: 'javascript/pit.js'
  });
});

module.exports = router;
