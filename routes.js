const express = require('express');
const ticketController = require('./controller/ticket');

const router = express.Router()


router.get('/api/getTicket', ticketController.createTicket);

module.exports = router 