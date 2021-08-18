require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/routes')
const {logger} = require('./utils/logger');


const PORT = process.env.PORT || 3000

const app = express()
require("./utils/mongo");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', '*');
    next();
})

app.use('/api', apiRoutes);


logger.info("APP START ----------");
app.get('*', (req, res) => {
    logger.error(`APP INVALID ROUTE ${req.originalUrl}`)
    res.status(404).json({
        message:`APP INVALID ROUTE  ${req.originalUrl}`
    })
});

app.listen(PORT, () => {
    logger.info(`Server has been started on port ${PORT}`)
})