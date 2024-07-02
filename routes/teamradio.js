const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('page01', { title: 'Team Radio', headline: 'Team Radio', id: 'teamradio', script: 'javascript/teamradio.js'});
});

module.exports = router;
