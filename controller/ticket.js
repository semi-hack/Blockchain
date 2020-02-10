const Ticket = require('../model/ticket');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const qrcode = require('qrcode');
var nodemailer = require('nodemailer');

async function createTicket(req, res) {

    const { user } = req.query;

    const QRcode = await qrcode.toDataURL( user, function (err, url) {
        console.log(url)
    })

    const t = await Ticket.create({
        QRcode
    })

    t.save();

    if(!t){
        res.json({
            success: false
        });
    }
    res.json({
        success: true,
        message: "ticket created",
        data: t
    });
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user,
        password: process.env.password
    }
});

const mailOptions = {
    from: 'sender@email.com', // sender address
    to: 'to@email.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
}

async function sendToMail() {
    transporter.sendMail(mailOptions, function(err, info) {
        if(err)
        console.log(err)
        else
        console.log(info)
    });   
}



async function deleteTicket(req, res) {
    const { id } = req.params;

    try {
        const data = await ticket.findByIdAndRemove(id);
        if (!data) {
            res.status(404).json({ success: false, message: 'not found' });
            return;
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    };

}

module.exports = { createTicket, sendToMail, deleteTicket }