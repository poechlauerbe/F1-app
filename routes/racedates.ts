const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('page01', {
    title: 'Race dates',
    headline: 'Race dates',
    id: 'racedates',
    script: 'javascript/racedates.js'
  });
});

module.exports = router;
