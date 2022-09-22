const express = require('express');
const app = express();
require('dotenv').config();
const connectDb = require('./database/db');

connectDb();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Api is running');
});

app.use('/recurring', require('./routes/api/payment'));
app.use('/payment', require('./routes/api/chargeCreditCard'));
app.use('/user', require('./routes/api/users'));
app.use('/user-info', require('./routes/api/userInfo'));
app.use('/recurring/data', require('./routes/api/recurringData'));
app.use('/user-subs', require('./routes/api/userSubs'));
app.use('/delete-subs', require('./routes/api/deleteSubs'));

app.listen(PORT, () => {
    console.log(`App is listening to Port ${PORT}..!!`);
});