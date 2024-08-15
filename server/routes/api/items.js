const express = require('express');
const router = express.Router();

const {handleGetItems, handleAddItem, handleUpdateItem, handleDeleteItem} = require('../../controllers/itemsController')

router.route('/')
    .get(handleGetItems)
    .post(handleAddItem);

router.route('/:id')
    .patch(handleUpdateItem)
    .delete(handleDeleteItem)

module.exports = router;