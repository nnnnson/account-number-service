const express = require('express');
const router = express.Router();

const tokensCollection = require('../database');

router.post('/', function (req, res, next) {
  try {
    const { tokens: receivedTokens } = req.body;

    if (!receivedTokens || !Array.isArray(receivedTokens) || receivedTokens.length === 0) {
      throw new Error('Invalid tokens');
    }

    const originalAccountNumbers = [];

    receivedTokens.forEach((token) => {
      if (!token) {
        throw new Error('Invalid tokens');
      }
      const record = tokensCollection.findOne({ token });
      if (record) {
        originalAccountNumbers.push(record.accountNumber);
      }
    });

    res.json(originalAccountNumbers);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
