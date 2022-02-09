const express = require('express');
const cors = require('cors');
require('./db')

const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})