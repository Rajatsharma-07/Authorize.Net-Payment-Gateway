const express = require('express');
require('dotenv').config();
const router = express.Router();
const User = require('../../models/User');
const getUsers = require('../../helper/getUsers');

router.get('/', async (req, res) => {
    /* User.find({}, function (err, result){
        if (err) {
            throw err;
        } else {
            console.log(typeof(result));
            res.send(result);
        }
    }) */
    var result = await getUsers();
    res.send(result); 

}); 

module.exports = router;