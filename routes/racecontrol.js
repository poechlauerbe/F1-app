const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('racecontrol', { title: 'RaceControl', headline: 'Race Control'});
});

module.exports = router;
