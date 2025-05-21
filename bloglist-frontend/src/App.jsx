import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/loginform'
import blogForm from './components/blogform'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)



  useEffect(() => {
    getblogs()
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getblogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => a.likes - b.likes).reverse() )
    )
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
    setMessage('logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    try{blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
      })
    setMessage('added blog')
    setTimeout(() => {
      setMessage(null)
    }, 5000)}
    catch (exception) {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('logged in')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const handledeleteof = id => {
    const blog = blogs.find(n => n.id === id)
    if (!window.confirm(`Delete '${blog.title}'?`)) return
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
      .catch(error => {
        setErrorMessage(`${blog.title} is not your blog!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    getblogs()
  }

  const handlelikeof = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes+1 }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrorMessage(`${blog.title} was liked but something went wrong`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    getblogs()

  }

  const blogowner = blog => {
    return (blog.user.username === user.username)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <Notification message={message}/>
        {loginForm()}
      </div>

    )
  }
  return (
    <div>
      <Notification message={errorMessage} />
      <Notification message={message}/>
      <h2>blogs</h2>
      <div> {user.username} logged in </div>  <button onClick={handleLogout}>logout</button>
      <br></br>
      {blogForm()}
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handlelike={() => handlelikeof(blog.id)} handledelete={() => handledeleteof(blog.id)} showDelete={blogowner(blog)}/>
      )}
    </div>
  )
}

export default App