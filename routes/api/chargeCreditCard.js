'use-strict';

const express = require('express');
require('dotenv').config();
const router = express.Router();
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var constants = require('../../constants');
var utils = require('../../utils');
var Card = require('../../models/CardDetails');
var Cart = require('../../models/Cart');
var chargeCreditCard = require('../../helper/chargeCreditCard');


router.post('/', (req, res) => {
    /**expiryDate
     * cvv
     * userId
     * cardNumber
     * amount
     * 
     */
    try{
        var expiryDate = req.query.expiry_date;
        console.log('expiryDate', expiryDate);
        var cvv = req.query.cvv;
        console.log('cvv', cvv);
        var userId = req.query.userId;
        console.log('userId', userId);
        var cardNumber = req.query.card_number;
        console.log('cardNumber', cardNumber);
        var amount = req.query.amount;
        console.log('amount', amount);
        chargeCreditCard(cardNumber, expiryDate, cvv, amount, userId);
    } catch (err) {
        res.status(400).send('Server Error');

    }
});

module.exports = router;
