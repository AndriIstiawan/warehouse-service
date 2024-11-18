const service = require('./service');
const { warehouseValidation, warehouseTransferValidation } = require('./validation');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    try {
        const { error, value } = await warehouseValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const chekSHop = await service.findShop(value.shopId);
        if (!chekSHop) return res.status(404).json({ message: 'Shop not found', status: false });

        await service.create(value);
        return res.status(201).json({ message: 'created', status: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { error, value } = await warehouseValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const cekWarehouse = await service.findWarehouse(req.params.warehouseId);
        if (!cekWarehouse) return res.status(404).json({ message: 'Warehouse not found', status: false });

        const chekSHop = await service.findShop(value.shopId);
        if (!chekSHop) return res.status(404).json({ message: 'Shop not found', status: false });

        cekWarehouse.name = value.name;
        cekWarehouse.status = value.status;
        cekWarehouse.shop = value.shopId;
        await cekWarehouse.save();
        return res.status(200).json({ message: 'updated', status: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.find = async (req, res) => {
    try {
        const warehouse = await service.find();
        return res.status(200).json({ message: 'success', warehouse });
    } catch (error) {
        return res.status(500).json({ message: 'unsuccess' });
    }
};

exports.findShop = async (req, res) => {
    try {
        const warehouse = await service.find({ shop: req.params.shopId });
        return res.status(200).json({ message: 'success', warehouse });
    } catch (error) {
        return res.status(500).json({ message: 'unsuccess' });
    }
};

exports.transfer = async (req, res) => {
    try {
        const { error, value } = await warehouseTransferValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const product = await service.findProduct(new mongoose.Types.ObjectId(value.productId), new mongoose.Types.ObjectId(value.warehouseFromId));
        // if (product.length < 1) return res.status(404).json({ message: 'Product not found', status: false });
        // const product = await service.findProduct(new mongoose.Types.ObjectId(value.productId));
        if (!product) return res.status(404).json({ message: 'Product in Warehouse From not found', status: false });
        // const Form = await service.findOne(new mongoose.Types.ObjectId(value.warehouseToId));
        // if (!Form) return res.status(404).json({ message: 'Warehouse From not found', status: false });
        const To = await service.findOne(new mongoose.Types.ObjectId(value.warehouseToId));
        if (!To) return res.status(404).json({ message: 'Warehouse To not found', status: false });

        const cekFrom = await product.warehouses.filter((item) => {
            return item._id == value.warehouseFromId && item.stok >= value.stok;
        });
        if (cekFrom.length < 1) return res.status(404).json({ message: 'Request Stok not valid', status: false });
        else {
            product.warehouses.map((item) => {
                if (item._id == value.warehouseFromId) {
                    item.stok -= value.stok;
                }
                return item;
            });
        }

        const cekTo = await product.warehouses.filter((item) => item._id == value.warehouseToId);
        if (cekTo.length < 1) {
            product.warehouses.push({
                _id: value.warehouseToId,
                stok: value.stok
            });

        } else {
            product.warehouses.map((item) => {
                if (item._id == value.warehouseToId) {
                    item.stok += value.stok;
                }
                return item;
            });
        }

        // const productTo = await service.findProduct(new mongoose.Types.ObjectId(value.productId), new mongoose.Types.ObjectId(value.warehouseFromId));
        // const to = await service.findOne(value.warehouseToId)
        // if (!to) return res.status(404).json({ message: 'Warehouse not found', status: false });

        await product.save();
        return res.status(201).json({ message: 'updated', status: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};