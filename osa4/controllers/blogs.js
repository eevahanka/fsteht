const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})
 
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.title) {
        response.status(400).end()
    }
    else if (!body.url) {response.status(400).end()} 
    else {
        // const user = await User.findById(body.userId)
        // const user = await 
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            // user: user.id
        })
        // if (!body.likes) {
        //     blog['likes'] = 0
        // }
        const savedBlog = await blog.save()
        // user.notes = user.notes.concat(savedNote._id)
        // await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
   
  })

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote)
})

module.exports = blogsRouter