const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    warehouses: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        stok: { type: Number },
    }]
});

productSchema.plugin(timestamps);

module.exports = mongoose.model('Product', productSchema);
