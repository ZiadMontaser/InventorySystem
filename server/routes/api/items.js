const express = require('express');
const router = express.Router();

const Item = require('../../model/Item')
const {handleGetItems, handleAddItem, handleUpdateItem, handleDeleteItem} = require('../../controllers/registerController')
router.route('/')
    .get(handleGetItems)
    .post(handleAddItem);

router.route('/:id')
    .patch(handleUpdateItem)
    .delete(handleDeleteItem)

module.exports = router;