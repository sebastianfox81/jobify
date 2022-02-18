import express  from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import morgan from 'morgan'
import 'express-async-errors'

// Db connection
import connectDB from './db/connect.js';
// Routers
import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js'

// MIDDLEWARE
import errorHandlerMiddleware  from './middleware/error-handler.js'
// import authenticateUser from './middleware/auth.js'

app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs',jobsRoutes)

app.use(errorHandlerMiddleware)

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