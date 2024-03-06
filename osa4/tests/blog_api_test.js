const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('blog api yleinen?', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
  })
  
  test('the first blog is by Chan', async () => {
    const response = await api.get('/api/blogs')
    const authors = response.body.map(e => e.author)
    assert(authors.includes('Michael Chan'))
  })
})

describe('blog id not _id', () => {
  test('id is id', async () => {
    const response = await api.get('/api/blogs')
    const ids =  response.body.map(e=>e.id)
    assert(ids.length > 0)
  })
})

describe('POST', () => {
  test('post adds blog', async () => {
    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
    
      const authors = response.body.map(r => r.author)
      assert.strictEqual(response.body.length, initialBlogs.length + 1)
    
      assert(authors.includes('Robert C. Martin'))
  })
  test('if likes missing assingn zero', async() => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      }
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/blogs')
      const authors = response.body.map(r => r.author)
      assert.strictEqual(response.body.length, initialBlogs.length + 1)
      assert(authors.includes('Robert C. Martin'))
      assert.strictEqual(response.body[2].likes, 0)
    })
  test('if missing title, return 400', async () => {
    const newBlog = {
      liks: 2,
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      }
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, initialBlogs.length)
  })
  test('if missing url, return 400', async () => {
    const newBlog = {
      liks: 2,
      author: "Robert C. Martin",
      title: "pikkuakksoen posti",
      }
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, initialBlogs.length)
  })
})

describe('DELETE', () => {
  test('can be deleted by id', async () => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await api.get('/api/blogs')
    const authors = blogsAtEnd.body.map(r => r.author)
    assert(!authors.includes(blogToDelete.author))
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})