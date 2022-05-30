import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

import notFoundMiddleware from './middleware/not-found.js'
import errorHandleMiddleware from './middleware/error-handler.js'

import connectDB from './db/connect.js'

app.get('/', (req,res) => {
  res.send('Welcome')
})

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
