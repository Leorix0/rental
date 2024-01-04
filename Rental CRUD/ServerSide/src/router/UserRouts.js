const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.post('/signup', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const userData = {
        ...req.body,
        password: hashedPassword,
      };

      const [results] = await connection.query('INSERT INTO users SET ?', [userData]);
      const newUser = {
        id: results.insertId,
        ...userData,
        password: undefined, // Remove hashed password from response
      };
      res.status(201).send(newUser);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [req.body.email]);

      if (results.length === 0) {
        return res.status(401).json({ status: 'fail', message: 'User not found' });
      }

      const user = results[0];
      const matchPass = await bcrypt.compare(req.body.password, user.password);

      if (matchPass) {
        const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY);
        res.status(200).send({
          status: 'Success',
          token,
          name: user.Name,
          userId: user.id,
        });
      } else {
        res.status(401).send({ status: 'fail', message: 'User details not match' });
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

