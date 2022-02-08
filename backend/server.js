const express = require('express');
const cors = require('cors');
require('./db')

const app = express();

app.use(express.json());
app.use(cors());
// app.use('/uploads', express.static('uploads'))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})