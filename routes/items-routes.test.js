process.env.NODE_ENV = 'test';
const request = require('supertest');

const app = require('../app');
let items = require('../fakeDb');

let grapes = { name: 'Grapes', price: 5.29 };

beforeEach(() => {
  items.push(grapes);
});

afterEach(() => {
  // empties out array (mutates, does not redefine 'items')
  items.length = 0;
});

describe('GET /items', () => {
  test('Get all items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [grapes] });
  });
});

describe('GET /items/:name', () => {
  test('Get item by name', async () => {
    const res = await request(app).get(`/items/${grapes.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: grapes });
  });
  test('Responds with 404 for invalid item', async () => {
    const res = await request(app).get(`/items/icecube`);
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /items', () => {
  test('Creating a item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Apples', price: 1.13 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: 'Apples', price: 1.13 } });
  });
  test('Responds with 400 if name is missing', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.statusCode).toBe(400);
  });
});

describe('/PATCH /items/:name', () => {
  test("Updating a item's name", async () => {
    const res = await request(app)
      .patch(`/items/${grapes.name}`)
      .send({ name: 'Graps', price: 5.29 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: 'Graps', price: 5.29 } });
  });
  test('Responds with 404 for invalid name', async () => {
    const res = await request(app)
      .patch(`/items/notgrape`)
      .send({ name: 'Grapes', price: 5.29 });
    expect(res.statusCode).toBe(404);
  });
});

describe('/DELETE /items/:name', () => {
  test('Deleting a item', async () => {
    const res = await request(app).delete(`/items/${grapes.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
  });
  test('Responds with 404 for deleting invalid item', async () => {
    const res = await request(app).delete(`/items/notgrape`);
    expect(res.statusCode).toBe(404);
  });
});
