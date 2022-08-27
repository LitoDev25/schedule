const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const contactController = require('./src/controllers/contactController')

/* routes of home */
route.get('/', homeController.homePage);
route.post('/', homeController.treatPost);

/* routes of contact */
route.get('/contact', contactController.homePage);


/* Export module route */
module.exports = route;