require('dotenv').config()
const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
const app = express()
const cors = require('cors')

const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  // response.send('<h1>Hello World!</h1>')

  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})