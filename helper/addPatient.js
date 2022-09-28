const Subs = require('../models/Subscription');

const addPatient = (id, limit) => {
    // Subs.findOneAndUpdate({subscriptionId : id}, {$set : {limitUsed : limit }}, (err, result) => {
    //     if(err){
    //         console.error(err);
    //     }else{
    //         res.send(result);
    //     }
    // })
};

module.exports = addPatient;