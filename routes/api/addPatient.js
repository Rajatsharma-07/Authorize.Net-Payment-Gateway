const express = require('express');
const router = express.Router();
const addPatient = require('../../helper/addPatient');
const Subs = require('../../models/Subscription');

router.put('/', (req, res) => {
    console.log("Patient api is called");
    const id = req.query.id;
    const limit = req.query.limit;
    console.log('id', id);
    console.log('limit', limit);
    addPatient(id, limit);
    res.send({message: "Successfully added patient"});
});

module.exports = router;