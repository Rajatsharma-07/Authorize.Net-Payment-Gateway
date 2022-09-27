const express = require('express');
const router = express.Router();
const addPatient = require('../../helper/addPatient');
const Subs = require('../../models/Subscription');

router.put('/', (req, res) => {
    const id = req.query.id;
    const limit = req.query.limit;
    console.log('id', id);
    console.log('limit', limit);
    Subs.findOneAndUpdate({subscriptionId : id}, {$set : {limitUsed : limit }}, (err, result) => {
        if(err){
            console.error(err);
        }else{
            res.send(result);
        }
    })
});

module.exports = router;