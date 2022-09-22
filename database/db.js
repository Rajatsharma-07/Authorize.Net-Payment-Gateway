require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log('Mongo Connected...');
        
    } catch (err) {
        console.error(err.message);

        //Exit process with faliure
        process.exit(1); 
    }
}

module.exports = connectDB;