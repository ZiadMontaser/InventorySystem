const mongoose = require('mongoose');

const itemScheme = mongoose.Schema({
    type: {
        type: String,
        enum: ['Mechanical Part', 'Raw Material', 'Electrical Part'],
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
        
    }
});

module.exports = mongoose.model('Item', itemScheme);