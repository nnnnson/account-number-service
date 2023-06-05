# Account number Service

This is a simple tokenization service in Node.js that allows you to swap out sensitive data, such as payment card or bank account numbers, with randomized tokens.

## Getting Started

1. Install the dependencies:
npm install
2. Start the server:
npm start

The server will start running on http://localhost:3000.

Tokenize - POST http://localhost:3000/tokenize
Detokenize - POST http://localhost:3000/detokenize

## Using Postman

This project includes one Postman collections. postman/tokenization.postman_collection.json

Tokenize - you could replace with other account number to test

Detokenize - to get valid input to test, you could run tokenize first, and paste the response tokens into request body of detokenize


## Run unit tests
npm test