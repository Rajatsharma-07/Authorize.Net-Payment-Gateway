const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Cart = require('../../models/Cart');

router.get('/', async (req, res) => {
    try {
        const modelCalls = [];
        let user;
        let cart;
        modelCalls.push(User.find({_id: req.query.id}).then(res => user = res));
        modelCalls.push(Cart.find({user: req.query.id}).then(res => cart = res));

       
        Promise.all(modelCalls).then(() => {
            res.send({
                user,
                cart
            });
        }).catch(() => {
            res.status(500).send('Internal server error')
        });
        
    } catch (error) {
        console.log(error);
    }

    
});
module.exports = router;