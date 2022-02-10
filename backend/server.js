const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
require('./db')
const { errorHandlerMiddleware } = require('./middleware/error-handler')

const app = express();
const authRoutes = require('./routes/authRoutes');
const jobsRoutes = require('./routes/jobsRoutes')

app.use(express.json());
app.use(cors());

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome!'})
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobsRoutes)

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})