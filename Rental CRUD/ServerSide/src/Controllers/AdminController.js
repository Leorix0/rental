const expressAsyncHandler = require('express-async-handler');
const Admin = require('./../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRATE_KEY = process.env.SECRATE_KEY;

const AdminRegisterCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const { password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            ...req.body,
            password: hashedPassword
        });

        res.status(201).json({ status: 'Success', user: admin });
    } catch (err) {
        res.status(400).json({ status: 'Failed', message: err.message });
    }
});

const AdminLoginCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const admin = await Admin.findOne({ where: { email: req.body.email } });

        if (admin) {
            const matchPass = await bcrypt.compare(req.body.password, admin.password);

            if (matchPass) {
                const token = jwt.sign({ _id: admin.id }, SECRATE_KEY);
                res.status(200).send({ status: 'Successfully login', token, name: admin.Name, AdminId: admin.id });
            } else {
                res.status(401).send({ status: 'Fail', message: 'User Details Not Match' });
            }
        } else {
            res.status(401).send({ status: 'Fail', message: 'User Details Not Match' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = { AdminRegisterCtrl, AdminLoginCtrl };

