const express = require('express');
const router = express.Router();
const Subs = require('../../models/Subscription');
const getUserSubs = require('../../helper/getUserSubs');

router.get('/', async (req, res) =>{

    // Subs.find({ user : req.query.id, status: 'active'}, (err, result) => {
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log(result);
    //         res.send(result);
    //     }
    // })
    const Id = req.query.id;
    var result = await getUserSubs(Id);
    console.log('-----------result-----------', result.length);
    for(let i = 0; i < result.length; i++){
        var maxvalue = result[result.length - 1];
    }
    res.send(result);
});

module.exports = router;