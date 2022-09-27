const express = require('express');
const router = express.Router();
const updateSubsStatus = require('../../helper/updateSubsStatus');

router.put('/', (req, res) => {
    const Id = req.query.id; 
    updateSubsStatus(Id);
});

module.exports = router;