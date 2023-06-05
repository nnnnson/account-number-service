const request = require('supertest');
const app = require('../app');
const tokensCollection = require('../database');

describe('Tokenization Service', () => {
  beforeEach(() => {
    tokensCollection.clear(); // Clear the tokens collection before each test
  });

  afterAll(() => {
    tokensCollection.clear(); // Clear the tokens collection after all tests are completed
  });

  test('POST /tokenize should return tokens for valid account numbers', async () => {
    const accountNumbers = [
      '4111-1111-1111-1111',
      '4444-3333-2222-1111',
      '4444-1111-2222-3333'
    ];

    const response = await request(app)
      .post('/tokenize')
      .send({ accountNumbers })
      .expect(200);

    const tokens = response.body;

    expect(Array.isArray(tokens)).toBe(true);
    expect(tokens.length).toBe(accountNumbers.length);
  });

  test('POST /tokenize should return an error for invalid account numbers', async () => {
    const invalidAccountNumbers = [
      '4111-1111-1111-1111',
      null,
      '4444-1111-2222-3333'
    ];

    const response = await request(app)
      .post('/tokenize')
      .send({ accountNumbers: invalidAccountNumbers })
      .expect(400);

    const { error } = response.body;

    expect(error).toBeDefined();
  });
});
