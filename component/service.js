const warehouse = require('./model');
const product = require('./relations/product-model');
const shop = require('./relations/shop-model');

exports.create = (body) => {
    return warehouse.create(body);
};

exports.find = (query) => {
    return warehouse.find(query).lean();
};

exports.findShop = (shopId) => {
    return warehouse.findById(shopId).lean();
};

exports.findWarehouse = (shopId) => {
    return warehouse.findById(shopId);
};

exports.findOne = (id) => {
    return warehouse.findOne(id).lean();
};

exports.findProduct = (productId, warehouseId) => {
    // return product.aggregate([
    //     {
    //         $match: { _id: productId }
    //     },
    //     {
    //         $lookup: {
    //             from: "warehouses",
    //             localField: "warehouses._id",
    //             foreignField: '_id',
    //             as: 'warehouses.warehouse'
    //         },
    //     },
    //     {
    //         $unwind: {
    //             path: '$warehouses'
    //         }
    //     },
    //     {
    //         $match: { 'warehouses.warehouse._id': warehouseId }
    //     },
    // ]);

    return product.findOne({
        $and: [
            { _id: productId },
            { warehouses: { $elemMatch: { _id: warehouseId } } }
        ]
    });
};

exports.transfer = (body) => {
    return product.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'products._id',
                foreignField: '_id',
                as: 'products'
            }
        }
    ]);
};
