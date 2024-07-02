const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('teamradio', { title: 'Team Radio', headline: 'Team Radio'});
});

module.exports = router;
