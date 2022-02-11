import express  from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
import morgan from 'morgan'
import 'express-async-errors'

const app = express();

import connectDB from './db/connect.js';

import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js'

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome!'})
})
// MIDDLEWARE
import  errorHandlerMiddleware  from './middleware/error-handler.js'
app.use(express.json());
app.use(cors());


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobsRoutes)

app.use(errorHandlerMiddleware)

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()