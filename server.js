const app = require('./app');
const db = require('./db');

db.sync()
  .then(()=> {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> {
      console.log(port);
    });
  });
