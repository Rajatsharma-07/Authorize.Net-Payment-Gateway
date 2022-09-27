const express = require('express');
const router = express.Router();
const Subs = require('../../models/Subscription');

router.get('/', (req, res) => {
    Subs.find({}, (err, data) => {
        if(err){
            console.error(err);
        }

        data.map((d)=>{
            if(d.startDate > d.endDate){
                d.status = 'expired';
                d.save();
            }
            console.log(d.startDate)
        })
    })
});

module.exports = router;