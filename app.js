const express = require('express');
const PORT = 3000;


const app = express();

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });


  app.listen(PORT, ()=> {
      console.log(`run successfully on ${PORT}`);
  })

  require('./router')(app);

