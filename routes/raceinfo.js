const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('page01', { title: 'Race info', headline: 'Race info', id: 'raceinfo', script: 'javascript/raceinfo.js'});
});

module.exports = router;
