const express = require('express');
const router = express.Router();
const getPlanData = require('../../helper/getPlanData');

router.get('/', async (req, res) => {
    const Id = req.query.id;
    var result = await getPlanData(Id);
    res.send(result);
});

module.exports = router;