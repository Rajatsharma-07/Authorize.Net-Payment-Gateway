const express = require('express');
const router = express.Router();
const Plan = require('../../models/Plan');

router.get('/', (req, res) => {
    Plan.find({_id : req.query.id }, function (err, result){
        if (err) {
            throw err;
        } else {
            console.log(typeof(result));
            res.send(result);
        }
    })

});

module.exports = router;