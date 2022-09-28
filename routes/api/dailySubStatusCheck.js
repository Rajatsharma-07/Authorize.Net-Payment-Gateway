const express = require('express');
const dailySubsStatusCheck = require('../../helper/dailySubStatusCheck');
const router = express.Router();
const Subs = require('../../models/Subscription');

router.get('/', (req, res) => {
    dailySubsStatusCheck()
});

module.exports = router;