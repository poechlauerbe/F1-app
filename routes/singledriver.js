const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('singledriver', {
    title: 'Single Driver',
    headline: 'Single Driver',
    id: 'singledriver',
    script: './javascript/singledriver.js',
  });
});

module.exports = router;
