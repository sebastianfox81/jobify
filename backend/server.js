const express = require('express');
const cors = require('cors');
require('./db')

const app = express();
const authRoutes = require('./routes/authRoutes');
const jobsRoutes = require('./routes/jobsRoutes')

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobsRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})