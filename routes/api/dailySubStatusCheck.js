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
        // else{
        //     for(let i = 0; i < data.length; i++){
        //         if(data[i].startDate > data[i].endDate){
        //             // data[i].status = 'expired';

        //         }
        //     }
        // }
    })
});

module.exports = router;