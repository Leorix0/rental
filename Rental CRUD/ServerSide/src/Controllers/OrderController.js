const expressAsyncHandler = require('express-async-handler');
const { Orders, sequelize } = require('../models');
const Sequelize = require('sequelize');

const orderRegisterCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const createData = await Orders.create(req.body);
        res.status(201).send(createData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const getOrdersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const UserId = req.params.id;
        const allOrders = await Orders.findAll({ where: { userId: UserId } });
        res.status(200).json({
            status: 'success',
            data: allOrders,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

const deleteOrderCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedData = await Orders.destroy({ where: { id: _id } });
        res.send(deletedData);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

const updateOrderCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const _id = req.params.id;
        const [updatedData] = await Orders.update(req.body, { where: { id: _id }, returning: true });
        res.status(201).send(updatedData);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = { orderRegisterCtrl, getOrdersCtrl, deleteOrderCtrl, updateOrderCtrl };
