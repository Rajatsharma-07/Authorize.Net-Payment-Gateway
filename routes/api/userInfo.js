const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Cart = require('../../models/Cart');
const getUserInfo = require('../../helper/getUserInfo');

router.get('/', async (req, res) => {
    const Id = req.query.id;
    var result = await getUserInfo(Id);
    res.send(result);
});
module.exports = router;