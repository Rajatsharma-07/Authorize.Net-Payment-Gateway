const express = require('express');
const router = express.Router();
const Subs = require('../../models/Subscription');

router.get('/', (req, res) =>{

    Subs.find({ user : req.query.id}, (err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    })
});

module.exports = router;