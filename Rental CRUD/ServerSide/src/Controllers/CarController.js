const expressAsyncHandler = require('express-async-handler');
const { Car, sequelize } = require('../models'); 
const jwt = require("jsonwebtoken");

const getImages = async (req, res) => {
    try {
        const image = await Car.findOne({
            where: {
                image: req.params.image,
            },
        });

        if (!image) {
            return res.status(404).send({ message: "Image not found" });
        }

        res.set("Content-Type", image.mimetype);
        res.send(image.image);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getCars = expressAsyncHandler(async (req, res) => {
    try {
        if (req.headers.authorization) {
            const readData = await Car.findAll();
            res.send(readData);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


const PostCars = expressAsyncHandler(async (req, res) => {
    try {
        if (req.headers.authorization) {
            const userVar = jwt.verify(req.headers.authorization, SECRATE_KEY); // id  //
            const createData = await Car.create({
                image: req.file.filename,
                AdminId: userVar._id,
                ...req.body,
            });
            res.status(201).send(createData);
        } else {
            res.status(404).send({ message: "Unauthorized User" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


const putCarData = expressAsyncHandler(async (req, res) => {
    try {
        if (req.headers.authorization) {
            const userVar = jwt.verify(req.headers.authorization, SECRATE_KEY);
            const _id = req.params.id;
            const car = await Car.findOne({
                where: {
                    id: _id,
                },
            });

            if (car) {
                if (userVar._id === car.AdminId) {
                    let updateData;
                    if (req.file) {
                        updateData = await Car.update(
                            { image: req.file.filename, ...req.body },
                            { where: { id: _id }, returning: true }
                        );
                    } else {
                        updateData = await Car.update(
                            req.body,
                            { where: { id: _id }, returning: true }
                        );
                    }
                    res.send(updateData[1][0]);
                } else {
                    res.status(401).send({ message: "You can't update the post" });
                }
            } else {
                res.status(401).send({ message: "Invalid Data" });
            }
        } else {
            res.status(401).send({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const deleteCarData = expressAsyncHandler(async (req, res) => {
    try {
        if (req.headers.authorization) {
            const userVar = jwt.verify(req.headers.authorization, SECRATE_KEY);
            const _id = req.params.id;
            const car = await Car.findOne({
                where: {
                    id: _id,
                },
            });

            if (car) {
                if (userVar._id === car.AdminId) {
                    const deletedata = await Car.destroy({
                        where: {
                            id: _id,
                        },
                    });
                    res.send(deletedata);
                } else {
                    res.status(401).send({ message: "You can't delete the post" });
                }
            } else {
                res.status(401).send({ message: "Invalid Data" });
            }
        } else {
            res.status(401).send({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const GetDataByAdminId = expressAsyncHandler(async (req, res) => {
    try {
        const AdminId = req.params.id;
        if (req.headers.authorization) {
            const readData = await Car.findAll({
                where: {
                    AdminId: AdminId,
                },
            });
            res.send(readData);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = {
    getImages,
    getCars,
    PostCars,
    putCarData,
    deleteCarData,
    GetDataByAdminId,
};
