const express = require('express');
const User = require('../model/User')

const bcrypt = require('bcrypt');

const handleAuthCheck =  express().use(async (req, res, next) => {
    if(!req.headers.authorization){
        res.sendStatus(401);
        return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const decryptedToken = Buffer.from(token, 'base64').toString('ascii').split(':');
    const username = decryptedToken[0];
    const password = decryptedToken[1];

    const foundUser = await User.findOne({"username": username});

    if(!foundUser){
        return res.sendStatus(400);
    }
    
    const match = bcrypt.compare(password, foundUser.password);

    if(!match){
        return res.sendStatus(401);
    }

    req.headers.userdata = foundUser;

    next();
})

module.exports = handleAuthCheck;