import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Userlist = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>No users found</div>
  }
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <div>added blogs</div>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Userlist
