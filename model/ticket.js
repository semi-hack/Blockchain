const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({

    QRcode: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ticket', TicketSchema);