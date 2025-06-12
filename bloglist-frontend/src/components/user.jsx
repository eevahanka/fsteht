import React, { useState } from 'react'
import PropTypes from 'prop-types'

const User = ({ user, users }) => {
  if (!user) {
    return <div>User not found</div>
  }
  const u1 = users.find((u) => u.username === user.username)
  const blogs = u1.blogs

  return (
    <div>
      <h2>{user.username}</h2>
      <div>added blogs</div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
