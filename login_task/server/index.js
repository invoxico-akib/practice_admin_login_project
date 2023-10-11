const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


const app = express()
const port = process.env.PORT || 5000;

 const router = require('./routes/router')

require('./db/conn')

app.use(cors());
app.use(express.json());
 app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});