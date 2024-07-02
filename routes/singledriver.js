const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('singledriver', { title: 'Single Driver', headline: 'Single Driver'});
});

module.exports = router;
