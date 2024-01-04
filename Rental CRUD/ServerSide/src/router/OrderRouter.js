const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Use mysql2 library for MySQL interactions
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

router.post('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query('INSERT INTO orders SET ?', [req.body]);
      const createdData = {
        id: results.insertId,
        ...req.body
      };
      res.status(201).send(createdData);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
      res.send(results);
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      await connection.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
      res.send({ message: 'Order deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      await connection.query('UPDATE orders SET ? WHERE id = ?', [req.body, req.params.id]);
      res.send({ message: 'Order updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
