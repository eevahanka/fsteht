import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/loginform'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogform'
import Userlist from './components/Userlist'
import User from './components/user'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createNewBlog,
  updateExistingBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { setUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const getblogs = () => {
    dispatch(initializeBlogs())
  }

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    setUsername('')
    setPassword('')
    dispatch(notification('logged out', 5))
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    try {
      dispatch(createNewBlog(blogObject)).then((returnedBlog) => {
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
      })

      dispatch(
        notification(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`, 5)
      )
    } catch (exception) {
      dispatch(notification('Error adding blog', 5))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(notification(`Welcome ${username}`, 5))
      getblogs()
    } catch (exception) {
      dispatch(notification('Wrong username or password', 5))
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddBlogVisible(true)}>add blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={newBlogTitle}
            author={newBlogAuthor}
            url={newBlogUrl}
            handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
            handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handledeleteof = (id) => {
    const blog = blogs.find((n) => n.id === id)
    if (!window.confirm(`Delete '${blog.title}'?`)) return
    dispatch(deleteBlog(id)).catch((error) => {
      dispatch(
        notification(`Error deleting blog: ${blog.title} is not your blog`, 5)
      )
    })
    getblogs()
  }

  const handlelikeof = (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user:
        typeof blog.user === 'object' && blog.user !== null
          ? blog.user.id
          : blog.user,
    }
    dispatch(updateExistingBlog(changedBlog)).catch((error) => {
      dispatch(notification(`Error liking blog: ${blog.title}`, 5))
    })
  }

  const routerStyle = {
    padding: '8px',
  }

  const blogowner = (blog) => {
    return blog.user.username === user.username
  }

  const UserById = ({ users }) => {
    const { id } = useParams()
    const user = users.find((u) => u.id === id)
    return <User user={user} users={users} />
  }

  const Blogs = ({ blogs }) => {
    if (user === null) {
      return (
        <div>
          <Notification />
          {loginForm()}
        </div>
      )
    }
    if (!blogs || blogs.length === 0) {
      return <div>No blogs found</div>
    }
    return (
      <div className="container">
        <h2>blogs</h2>
        <br></br>
        {blogForm()}
        <br></br>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handlelike={() => handlelikeof(blog.id)}
            handledelete={() => handledeleteof(blog.id)}
            showDelete={blogowner(blog)}
          />
        ))}
      </div>
    )
  }

  const Home = () => {
    if (user === null) {
      return (
        <div className="container">
          <Notification />
          {loginForm()}
          <br></br>
          welcome to the fullstack blog app
        </div>
      )
    }
    return (
      <div className="container">
        <Notification />
        <div> {user.username} logged in </div>{' '}
        <button onClick={handleLogout}>logout</button>
        <br></br>
        <div className="container">
          welcome to the fullstack blog app welcome to the fullstack blog app
          welcome to the fullstack blog app welcome to the fullstack blog app
          welcome to the fullstack blog app welcome to the fullstack blog app
          welcome to the fullstack blog app welcome to the fullstack blog app
          welcome to the fullstack blog app welcome to the fullstack blog app
          welcome to the fullstack blog app welcome to the fullstack blog app
          welcome to the fullstack blog app welcome to the fullstack blog app
          welcome to the fullstack blog app
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="container">
        {' '}
        <Link style={routerStyle} to="/">
          home
        </Link>
        <Link style={routerStyle} to="/users">
          users
        </Link>
        <Link style={routerStyle} to="/blogs">
          blogs
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserById users={users} />} />
        <Route path="users" element={<Userlist users={users} />} />
        <Route path="/blogs" element={<Blogs blogs={blogs} />} />
      </Routes>
    </Router>
  )
}

export default App
