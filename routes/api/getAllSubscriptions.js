const express = require('express');
const router= express.Router();
const getSubsDetails = require('../../helper/getSubsDetails');


router.get('/', async (req, res) => {
    var result = await getSubsDetails();
    console.log('result', result);
    res.send(result);
});

module.exports = router;