const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'freelancer',
  password: 'Sri@29150519',
  port: 5432,
});

// Test database connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1', 
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Insert new user (without password hashing - UNSAFE for production)
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );

    res.json({
      success: true,
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during signup'
    });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const result = await pool.query(
      'SELECT id, name, email, password FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    // Compare passwords (plaintext comparison - UNSAFE for production)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Successful login
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});