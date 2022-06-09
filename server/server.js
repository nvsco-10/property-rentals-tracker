import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// import helmet from 'helmet'
// import xss from 'xss-clean'
// import mongoSanitize from 'express-mongo-sanitize'

// db and authenticate user
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import rentalsRouter from './routes/rentalsRoutes.js'
import ownersRouter from './routes/ownersRoutes.js'

import notFoundMiddleware from './middleware/not-found.js'
import errorHandleMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
// app.use(helmet())
// app.use(xss())
// app.use(mongoSanitize())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/rentals', authenticateUser, rentalsRouter)
app.use('/api/v1/owners', authenticateUser, ownersRouter)

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})


app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
