const User = require('../model/User');

const bcrypt = require('bcrypt');

async function handleRegisterUser(req, res) {
    if(!req.body.username || !req.body.password){
        res.status(400);
        res.send("No username or password found");
        return;
    }

    const foundUser = await User.findOne({username: req.body.username}).exec();

    if(foundUser != null){

        res.status(400)
        res.send("User already registerd")
        return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.PASSWORD_HASH_SALT));

    const result = await User.create({
        'username': req.body.username,
        'password': hashedPassword
    });

    res.status(201);
    res.send(`${req.body.username} was created.`)
}

module.exports = handleRegisterUser;