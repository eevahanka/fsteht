import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/loginform'
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
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)



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
      console.log(user, password)
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
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
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
    </form>  )
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App