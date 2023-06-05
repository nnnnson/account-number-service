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

  test('POST /detokenize should return original account numbers for valid tokens', async () => {
    const tokens = [
      'fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy',
      'L4hKuBJHxe67ENSKLVbdIH8NhFefPui2',
      'ZA5isc0kVUfvlxTE5m2dxIY8AG76KoP3'
    ];

    tokens.forEach((token) => {
      tokensCollection.insert({ token, accountNumber: `original-${token}` });
    });

    const response = await request(app)
      .post('/detokenize')
      .send({ tokens })
      .expect(200);

    const accountNumbers = response.body;

    expect(Array.isArray(accountNumbers)).toBe(true);
    expect(accountNumbers.length).toBe(tokens.length);

    tokens.forEach((token, index) => {
      expect(accountNumbers[index]).toBe(`original-${token}`);
    });
  });

  test('POST /detokenize should return an error for invalid tokens', async () => {
    const invalidTokens = [
      'fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy',
      null,
      'ZA5isc0kVUfvlxTE5m2dxIY8AG76KoP3'
    ];

    const response = await request(app)
      .post('/detokenize')
      .send({ tokens: invalidTokens })
      .expect(400);

    const { error } = response.body;

    expect(error).toBeDefined();
  });
});
