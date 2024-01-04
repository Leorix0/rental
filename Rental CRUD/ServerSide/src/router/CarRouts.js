// Routes/carRoutes.js
const express = require('express');
const Router = express.Router();
const { getImages, getCars, PostCars, putCarData, deleteCarData, GetDataByAdminId } = require('../controllers/CarController');
const multer = require('multer');

// Multer and GridFS-related code is not required for Sequelize

const upload = multer();
const middleware = upload.single('image');

Router
    .route('/:image')
    .get(getImages);

Router
    .route('/')
    .get(getCars)
    .post(middleware, PostCars);

Router
    .route('/:id')
    .put(middleware, putCarData)
    .delete(deleteCarData);

Router
    .route('/:id')
    .get(GetDataByAdminId);

module.exports = Router;
