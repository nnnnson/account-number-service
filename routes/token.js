const express = require('express');
const router = express.Router();

const tokensCollection = require('../database');

router.post('/', function (req, res, next) {
  try {
    const { accountNumbers } = req.body;

    if (!accountNumbers || !Array.isArray(accountNumbers) || accountNumbers.length === 0) {
      throw new Error('Invalid account numbers');
    }

    const generatedTokens = [];

    accountNumbers.forEach((accountNumber) => {
      if (!accountNumber) {
        throw new Error('Invalid account numbers');
      }
      const token = generateToken();
      tokensCollection.insert({ token, accountNumber });
      generatedTokens.push(token);
    });
    res.json(generatedTokens);
  } catch (error) {
    next(error);
    // res.status(400).json({ error: error.message });
  }
});

// Generate a random token
function generateToken () {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

module.exports = router;
