import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


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


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
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
        .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // console.log(exception)
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>Blog title<input 
        value={newBlogTitle}
        onChange={({ target }) => setNewBlogTitle(target.value)}
      />
      </div>
      <div>Blog Author<input 
        value={newBlogAuthor}
        onChange={({ target }) => setNewBlogAuthor(target.value)}
      />
      </div>
      <div>Blog Url<input 
        value={newBlogUrl}
        onChange={({ target }) => setNewBlogUrl(target.value)}
      />
      </div>
      <button type="submit">save</button>
    </form>  
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <Notification message={message}/>
        <h2>Log in to application</h2>
<form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App