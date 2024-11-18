//Validation
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

exports.warehouseValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        status: Joi.boolean(),
        shop: Joi.objectId().required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
};

exports.warehouseTransferValidation = data => {
    const schema = Joi.object({
        productId: Joi.objectId().required(),
        warehouseFromId: Joi.objectId().required(),
        warehouseToId: Joi.objectId().required(),
        stok: Joi.number().required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
};