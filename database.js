const Loki = require('lokijs');
const db = new Loki();

const tokensCollection = db.addCollection('tokens');

module.exports = tokensCollection;
