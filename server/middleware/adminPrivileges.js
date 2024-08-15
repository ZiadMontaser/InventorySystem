const express = require('express');
const User = require('../model/User')

const bcrypt = require('bcrypt');

const handleAuthCheck =  express().use(async (req, res, next) => {
    const user = req.headers.userdata;

    if(user.isAdmin || req.method == 'GET'){
        next()
    }else{
        res.sendStatus(403)
    }
});

module.exports = handleAuthCheck;