const Item = require('../model/Item')
const mongoose = require('mongoose');
async function handleGetItems(req, res) {
    const result = await Item.find().exec();
        res.send(JSON.stringify(result));
}

async function handleAddItem (req,res){

    if(!req.body.name || !req.body.quantity){
        return res.status(400).send("Name or quantity is missing.");
    }

    const newItem = await Item.create(req.body);

    res.status(201).send(newItem)
}

async function handleUpdateItem (req,res) {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body);
    
    res.send(item);
}

async function handleDeleteItem (req, res) {
    await Item.findByIdAndDelete(req.params.id)
    res.sendStatus(200);
}

module.exports = {handleGetItems, handleAddItem, handleUpdateItem, handleDeleteItem};