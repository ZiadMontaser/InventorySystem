require('dotenv').config();

const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require('cors');

require('./connectDB')();

app.use((req, res, next) => {
    console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
    next();
})

app.use(cors());
app.use(express.json())

app.use('/', require('./routes/root'))

app.use('/api/register', require('./routes/api/register'))


app.use('/', require('./middleware/auth'))
app.use('/api/login', (req,res)=>res.send({isAdmin: req.headers.userdata.isAdmin}));

app.use('/api/items', require('./middleware/adminPrivileges'))
app.use('/api/items', require('./routes/api/items'))


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
