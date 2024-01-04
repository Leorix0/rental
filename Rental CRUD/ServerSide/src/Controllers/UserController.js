const expressAsyncHandler = require('express-async-handler');
const User = require('../models/User');  
const Sequelize = require('sequelize');
const sequelize = require('../db/connection');  //Sequelize connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRATE_KEY = process.env.SECRATE_KEY;

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const { password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ status: 'Failed', field: 'email', message: 'Email already exists!!' });

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        res.status(201).json({ status: 'Success', user: newUser });
    } catch (err) {
        res.status(400).json({ status: 'Failed', message: err.message });
    }
});

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (user) {
            const matchPass = await bcrypt.compare(req.body.password, user.password);

            if (matchPass) {
                const token = jwt.sign({ _id: user.id }, SECRATE_KEY);
                res.status(200).send({ status: 'Successfully login', token, name: user.Name, userId: user.id });
            } else {
                res.status(401).send({ status: 'fail', message: 'User Details Not Match' });
            }
        } else {
            res.status(401).send({ status: 'fail', message: 'User Details Not Match' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = { userRegisterCtrl, loginUserCtrl };
