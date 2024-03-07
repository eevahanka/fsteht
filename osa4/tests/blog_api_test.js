const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
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

const initialUsers = [
  {
    username: "Pentsa", 
    name: "Pena herhe",
    password: "salaisuus",
  },
  {
    username: "Test",
    name: "testaaja",
    password: "testisanasala"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
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
    logger.tprint(response.body)
    const authors = response.body.map(e => e.author)
    logger.tprint(authors)
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

describe('PUT', () => {
  test('can be edited by id', async () => {
    const response = await api.get('/api/blogs')
    const blogToEdit = response.body[0]
    const newBlogContent = {
    author: 'me, myself and i',
    }
    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(newBlogContent)
    const blogsAtEnd = await api.get('/api/blogs')
    const authors = blogsAtEnd.body.map(r => r.author)
    assert(authors.includes(newBlogContent.author))
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)
  })
})

describe('users', () => {
  test('users returned as json', async () => {
    await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  test('Pentsa in users', async () => {
    const response = await api.get('/api/users')
    const users = response.body.map(e => e.username)
    assert(users.includes('Pentsa'))
  })
  test('can add user', async ()=>{
    const newUser = {
      username: "uusi",
      name: "uusinta",
      password: "tosihyv"
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/users')
    const users = response.body.map(e => e.username)
    assert(users.includes('uusi'))
  } )
  test('cant add same username', async () => {
    const newUser = {
      username: "Test",
      name: "toinentestaaja",
      password: "testisanasala"
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  })
  test('must have username', async () => {
    const newUser = {
      name: "toinentestaaja",
      password: "testisanasala"
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  })
  test('must have password', async () => {
    const newUser = {
      name: "toinentestaaja",
      username: "testisanasala"
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  })
  test('password lenght more 3', async () => {
    const newUser = {
      name: "toinentestaaja",
      password: "abc"
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})