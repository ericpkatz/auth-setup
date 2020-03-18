const { expect } = require('chai');
const app = require('supertest')(require('../app'));
const db = require('../db');
const jwt = require('jwt-simple');

describe('routes', ()=> {
  let seed;
  beforeEach(async()=> seed = await db.sync());
  describe('POST /api/auth', ()=> {
    describe('with correct password', ()=> {
      it('a user gets back a token', async()=> {
        const response = await app.post('/api/auth')
          .send({ username: 'lucy', password: 'LUCY'})
        expect(response.status).to.equal(200);
        expect(response.body.token).to.equal(jwt.encode({ id: seed.lucy.id}, process.env.JWT));
      });
    });
    describe('with an incorrect password', ()=> {
      it('a user gets back a 401', async()=> {
        const response = await app.post('/api/auth')
          .send({ username: 'lucy', password: 'LCY'})
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('bad credentials');
      });
    });
  });
  describe('GET /api/auth', ()=> {
    describe('with a valid token', ()=> {
      it('return the user', async()=> {
        const token = jwt.encode({ id: seed.lucy.id}, process.env.JWT);
        const response = await app.get('/api/auth')
          .set('authentication', token);
        expect(response.status).to.equal(200);
        expect(response.body.username).to.equal('lucy');

      });
    });
    describe('with a valid token', ()=> {
      it('return the user', async()=> {
        const token = jwt.encode({ id: seed.lucy.id}, process.env.JWT + '!');
        const response = await app.get('/api/auth')
          .set('authentication', token);
        expect(response.status).to.equal(401);

      });
    });
  });
});
