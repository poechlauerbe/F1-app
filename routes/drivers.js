const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('drivers', { title: 'Drivers', headline: 'Drivers'});
});

module.exports = router;
