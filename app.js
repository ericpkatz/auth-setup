const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());

const db = require('./db');

app.use((req, res, next)=> {
  if(!req.headers.authentication){
    return next();
  }
  db.getUserFromToken(req.headers.authentication)
    .then( user => {
      req.user = user;
      next();
    })
    .catch( ex => {
      const error = Error('bad credentials');
      error.status = 401;
      next(error);
    });
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/auth', async(req, res, next)=>{
  db.authenticate(req.body)
    .then( token => res.send({ token }))
    .catch(ex => {
      const error = Error('bad credentials');
      error.status = 401;
      next(error);
    });
});

app.get('/api/auth', (req, res,next)=>{
  if(!req.user){
    const error = Error('bad credentials');
    error.status = 401;
    return next(error);
  }
  res.send(req.user);
});



app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ message: err.message});
});

module.exports = app;
