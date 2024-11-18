const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    status: {
        type: Boolean, default: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    }
});

warehouseSchema.plugin(timestamps);

module.exports = mongoose.model('Warehouse', warehouseSchema);
