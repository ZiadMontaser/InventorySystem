const express = require('express');
const router = express.Router();

const Item = require('../../model/Item')

router.route('/')
    .get(async (req,res) => {
        const result = await Item.find().exec();
        res.send(JSON.stringify(result));

    })
    .post(async (req,res)=>{

        if(!req.body.name || !req.body.quantity){
            return res.status(400).send("Name or quantity is missing.");
        }

        const newItem = await Item.create(req.body);

        res.status(201).send(newItem)
    });

router.route('/:id')
    .patch( async (req,res)=>{
        const item = await Item.findByIdAndUpdate(req.params.id, req.body);
        
        res.send(item);
    })
    .delete( async (req, res) => {
        await Item.deleteOne({_id: req.params.id})
    })


module.exports = router;