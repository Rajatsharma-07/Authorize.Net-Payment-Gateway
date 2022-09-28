const Subs = require('../models/Subscription');

const addPatient = (id, limit) => {
    Subs.findOneAndUpdate({ subscriptionId : id}, {$set : {limitUsed : limit}}, (err, res) =>{
        if(err){
            console.error(err);
        }else{
            console.log(res);
        }
    });
};

module.exports = addPatient;