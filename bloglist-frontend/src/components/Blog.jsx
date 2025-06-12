import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handlelike, handledelete, showDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div
      style={{
        marginBottom: '3px',
        padding: '3px',
        border: '1px solid black',
      }}>
      <div>
        {blog.title} – {blog.author}
        <button onClick={toggleDetails}>{showDetails ? 'show' : 'show'}</button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes <button onClick={handlelike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {showDelete && (
            <div>
              {' '}
              <button onClick={handledelete}>delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handledelete: PropTypes.func.isRequired,
  handlelike: PropTypes.func.isRequired,
}

export default Blog
