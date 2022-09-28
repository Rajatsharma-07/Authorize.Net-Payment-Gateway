const Subs = require('../models/Subscription');

const dailySubsStatusCheck = () => {
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
    });
});
};

module.exports = dailySubsStatusCheck;