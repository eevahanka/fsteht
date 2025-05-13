const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user', {name:1, username:1})
  response.json(blogs)
})
 
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.title) {
        response.status(400).end()
    }
    else if (!body.url) {response.status(400).end()} 
    else {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = request.user
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user.id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    const blogUser = blog.user
    if (!(user.id==blogUser)){
        return response.status(401).json({error: 'cant delete other users blog'})
    } else {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }
  })

blogsRouter.put('/:id', async (request, response) => {
    console.log(2345)
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter