const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const User = require('../model/user');


async function createUser(req, res) {
    const {
        firstname,
        lastname,
        email
    } = req.query;

    const schema = Joi.object().keys({
        firstname: Joi.object().required(),
        lastname: Joi.object().required(),
        email: Joi.object().required(),
    });
    const validation = Joi.validate(req.query, schema);
    if (validation.error !== null) {
        res.status(400).send({
            success: false,
            message: validation.error.details[0].message,
        });
        return;
    }

    const data = await User.create({
        firstname,
        lastname,
        email
    })

    if(!data){
        res.status(400).json({
            success: false,
            message: "user not created"
        });
    }
    res.json({
        success: true,
        message: "user created",
        data: data
    });
};

async function getUserById(req, res){
    const { id } = req.params

    const data = await User.findOne({ _id: mongoose.Types.ObjectId(id) })

    if(!data){
        res.status(400).json({
            success: false,
            message: "user not found"
        });
    }
    res.json({
        success: true,
        data
    })

    
}


module.exports = { createUser, getUserById }