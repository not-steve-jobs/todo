const mongoose = require('mongoose');
const { logger } = require('./logger');
require('dotenv').config();


const mongooseConnectionString = process.env.DB_URL
const options = {
    useUnifiedTopology: true ,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};


mongoose.connect(mongooseConnectionString, options, function (err) {
    logger.info(`mongoose connected`);
    if (err) {
        logger.error(`mongoose connection error : ${err}`);
        throw err;
    } else {
        logger.info('success');
    }
});


exports.disconnect = () => {
    mongoose.disconnect()
        .then(() => {
            logger.info('Mongoose server has disconnected!!!');
        })
        .catch(error => {
            logger.error(`Mongoose disconnecting from server failed ${error}`);
        })
}