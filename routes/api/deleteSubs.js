const express = require('express');
const router = express.Router();
const Subs = require('../../models/Subscription');

router.delete('/', (req, res) => {
    Subs.findOneAndDelete({ subscriptionId : req.query.id}, (err, res) =>{
        if(err){
            console.error(err);
        }else{
            console.log(res);
        }
    });
})

module.exports = router;