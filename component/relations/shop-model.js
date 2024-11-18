const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    warehouse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
    }]
});

shopSchema.plugin(timestamps);

module.exports = mongoose.model('Shop', shopSchema);
