import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

// db and authenticate user
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
// import rentalsRouter from './routes/rentalsRoutes.js'

import notFoundMiddleware from './middleware/not-found.js'
import errorHandleMiddleware from './middleware/error-handler.js'

if(process.env.NODE_ENV !== 'productiion'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req,res) => {
  res.send('Welcome')
})

app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/rentals', jobsRouter)

// only when ready to deploy
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
// })

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