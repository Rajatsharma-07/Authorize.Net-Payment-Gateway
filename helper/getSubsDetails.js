const Plan = require('../models/Plan');

const getSubsDetails = () => {
    return Plan.find({});
};

module.exports = getSubsDetails;
