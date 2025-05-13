import React, { useState } from 'react'

const Blog = ({ blog, handlelike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={{ marginBottom: '3px', padding: '3px', border: '1px solid black' }}>
      <div>
        {blog.title} – {blog.author}
        <button onClick={toggleDetails}>{showDetails ? 'hide' : 'show'}</button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button onClick={handlelike}>like</button></div>
          <div>{blog.user?.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog