const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('page01', { title: 'Race Info', headline: 'Race Info', id: 'raceinfo', script: 'javascript/raceinfo.js'});
});

module.exports = router;
