const Subs = require('../models/Subscription');

const updateSubsStatus = (id) => {
    Subs.findOneAndUpdate({ subscriptionId : id}, {$set : {status : 'inactive'}}, (err, res) =>{
        if(err){
            console.error(err);
        }else{
            console.log(res);
        }
    });
}

module.exports = updateSubsStatus;