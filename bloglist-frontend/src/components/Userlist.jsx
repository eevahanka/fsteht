import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Userlist = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>No users found</div>
  }
  return (
    <div>
      <h2>Users</h2>
      {users.map((user1) => (
        <div key={user1.id}>
          <Link to={`/users/${user1.id}`}>{user1.username}</Link>
          <div>added blogs</div>
          <ul>
            {user1.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Userlist
