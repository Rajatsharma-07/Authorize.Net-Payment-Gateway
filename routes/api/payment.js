'use-strict';

const express = require('express');
require('dotenv').config();
const router = express.Router();
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var constants = require('../../constants');
var utils = require('../../utils');
const Subs = require('../../models/Subscription');
const Cart = require('../../models/Cart');
const Card = require('../../models/CardDetails');

router.post('/', (req, res) => {
    var card_number = req.query.card_number;
    var expiry_date = req.query.expiry_date;
    var cvv = req.query.cvv; 

    console.log(card_number, expiry_date, cvv);

    function getSubsResponse(response, subsId){
        console.log('checkResponseSubsWaala--->', response);
        let res = JSON.stringify(response)
        console.log('checkResponseSubsWaalabnbnnbnnb--->', response.subscription.arbTransactions);

        const cardFields = {};
    
        cardFields.user = req.query.user;
        cardFields.cardNumber = req.query.card_number;
        cardFields.expiryDate = req.query.expiry_date;

        var subsfield= {};
        subsfield.user = req.query.user;
        subsfield.planId = req.query.id;
        subsfield.subscriptionId = subsId;
        subsfield.customerProfileId = response.subscription.profile.customerProfileId;
        subsfield.customerPaymentProfileId = response.subscription.profile.paymentProfile.customerPaymentProfileId;
        subsfield.customerAddressId = response.subscription.profile.paymentProfile.customerAddressId;
        subsfield.startDate = response.subscription.paymentSchedule.startDate;
        subsfield.status = response.subscription.status;
        //subsfield.txnId = response.subscription.arbTransactions.arbTransaction.transId;
        subsfield.limit = '10';
        subsfield.limitUsed = '1';
        console.log('successfull');

        var cartField = {};
        cartField.user = req.query.user;
        cartField.planId = req.query.id;
        cartField.totalAmount = response.subscription.amount;

        try {
            var subs = new Subs(subsfield);
            subs.save();
            var cart = new Cart(cartField);
            cart.save();
            var card = new Card(cardFields);
            card.save();
            console.log('successfull');
        } catch (err) {
            console.error(err);
        }
    };

    function checkResponse(response){
        console.log('---------------------------------------------->');
        getSubscription(response.subscriptionId, getSubsResponse);
        return;

        var subsfield= {};
        subsfield.user = '6321ab2945d1b99518bcfef3';
        subsfield.plan = '6321ad6445d1b99518bcfef8';
        subsfield.subscriptionId = response.subscriptionId;
        subsfield.customerProfileId = response.profile.customerProfileId;
        subsfield.customerPaymentProfileId = response.profile.customerPaymentProfileId;
        subsfield.customerAddressId = response.profile.customerAddressId;
        subsfield.limit = '10';
        subsfield.limitUsed = '1';
        console.log('successfull');

        try {
            var subs = new Subs(subsfield);
            subs.save();
            console.log('successfull');
        } catch (err) {
            console.error(err);
        }
    }
    createSubscription(checkResponse);

    function getSubscription(subscriptionId, callback) {
        var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName(constants.apiLoginKey);
        merchantAuthenticationType.setTransactionKey(constants.transactionKey);
    
        var getRequest = new ApiContracts.ARBGetSubscriptionRequest();
        getRequest.setMerchantAuthentication(merchantAuthenticationType);
        getRequest.setSubscriptionId(subscriptionId);
        getRequest.setIncludeTransactions(true);
    
        console.log(JSON.stringify(getRequest.getJSON(), null, 2));
            
        var ctrl = new ApiControllers.ARBGetSubscriptionController(getRequest.getJSON());
    
        ctrl.execute(function(){
            var apiResponse = ctrl.getResponse();
    
            var response = new ApiContracts.ARBGetSubscriptionResponse(apiResponse);
    
            console.log(JSON.stringify(response, null, 2));
            
            if(response != null){
                if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
                    console.log('Subscription Name : ' + response.getSubscription().getName());
                    console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
                    console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
                }
                else{
                    console.log('Result Code: ' + response.getMessages().getResultCode());
                    console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                    console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                }
            }
            else{
                console.log('Null Response.');
            }
    
    
            callback(response, subscriptionId);
        });
    };

    function createSubscription(callback){
        console.log('I am here');
        var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName(constants.apiLoginKey);
        merchantAuthenticationType.setTransactionKey(constants.transactionKey);
    
        var intervalType = new ApiContracts.PaymentScheduleType.Interval();
        intervalType.setLength(1);
        intervalType.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);
     
        var paymentScheduleType = new ApiContracts.PaymentScheduleType();
        paymentScheduleType.setInterval(intervalType);
        paymentScheduleType.setStartDate('2022-10-13');
        paymentScheduleType.setTotalOccurrences(12 * (req.query.timeperiod));
        paymentScheduleType.setTrialOccurrences(1);
    
        var creditCard = new ApiContracts.CreditCardType();
        creditCard.setExpirationDate('2038-12');
        creditCard.setCardNumber(req.query.card_number);
        creditCard.setCardCode(req.query.cvv);
    
        var payment = new ApiContracts.PaymentType();
        payment.setCreditCard(creditCard);
    
        var orderType = new ApiContracts.OrderType();
        orderType.setInvoiceNumber(utils.getRandomString('Inv:')); 
        orderType.setDescription(utils.getRandomString('Description'));
    
        var customer = new ApiContracts.CustomerType();
        customer.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
        customer.setId(utils.getRandomString('Id'));
        customer.setEmail(utils.getRandomInt()+'@test.anet.net');
        customer.setPhoneNumber('1232122122');
        customer.setFaxNumber('1232122122');
        customer.setTaxId('911011011');
    
        var nameAndAddressType = new ApiContracts.NameAndAddressType();
        nameAndAddressType.setFirstName(utils.getRandomString('FName'));
        nameAndAddressType.setLastName(utils.getRandomString('LName'));
        nameAndAddressType.setCompany(utils.getRandomString('Company'));
        nameAndAddressType.setAddress(utils.getRandomString('Address'));
        nameAndAddressType.setCity(utils.getRandomString('City'));
        nameAndAddressType.setState(utils.getRandomString('State'));
        nameAndAddressType.setZip('98004');
        nameAndAddressType.setCountry('USA');
    
        var arbSubscription = new ApiContracts.ARBSubscriptionType();
        arbSubscription.setName(utils.getRandomString('Name'));
        arbSubscription.setPaymentSchedule(paymentScheduleType);
        arbSubscription.setAmount(req.query.amount);
        arbSubscription.setTrialAmount(0);
        arbSubscription.setPayment(payment);
        arbSubscription.setOrder(orderType);
        arbSubscription.setCustomer(customer);
        arbSubscription.setBillTo(nameAndAddressType);
        arbSubscription.setShipTo(nameAndAddressType);
    
        var createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
        createRequest.setMerchantAuthentication(merchantAuthenticationType);
        createRequest.setSubscription(arbSubscription);
    
        console.log(JSON.stringify(createRequest.getJSON(), null, 2));
    
        var ctrl = new ApiControllers.ARBCreateSubscriptionController(createRequest.getJSON());
        console.log('ctrl--> ', ctrl);
    
        ctrl.execute(function(){
            var apiResponse = ctrl.getResponse();
            console.log('apiResponse-->', apiResponse);
            var response = new ApiContracts.ARBCreateSubscriptionResponse(apiResponse);
            console.log('Response-->', response);
            console.log(JSON.stringify(response, null, 2));
    
            if(response != null){
                if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
                    console.log('Subscription Id : ' + response.getSubscriptionId());
                    console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
                    console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
                }
                else{
                    console.log('Result Code: ' + response.getMessages().getResultCode());
                    console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                    console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                }
            }
            else{
                console.log('Null Response.');
            }
    
    
            callback(response);
        });
    }
    
    if (require.main === module) {
        createSubscription(function(){
            console.log('createSubscription call complete.');
        });
    }
});

module.exports = router;
