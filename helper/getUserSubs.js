const Subs = require('../models/Subscription');

const getUserSubs = (Id) => {
    return Subs.find({ user : Id, status: 'active'});
}

module.exports = getUserSubs;