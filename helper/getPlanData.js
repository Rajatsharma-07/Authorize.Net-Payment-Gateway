const Plan = require('../models/Plan');

const getPlanData = (Id) => {
    //  Plan.find({_id : Id }, function (err, result){
    //     if (err) {
    //         throw err;
    //     } else {
    //         console.log(result);
    //         return result;
    //     }
    // })
    return Plan.find({_id : Id });
};

module.exports = getPlanData;