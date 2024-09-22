const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('page01', {
    title: 'Impressum',
    headline: 'Impressum',
    id: 'impressum',
    script: 'javascript/impressum.js'
  });
});

module.exports = router;
