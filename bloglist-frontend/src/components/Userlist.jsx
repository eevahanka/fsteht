import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const Userlist = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>No users found</div>
  }
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th> </th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user1) => (
            <tr key={user1.id}>
              <td>
                <Link to={`/users/${user1.id}`}>{user1.username}</Link>
              </td>
              <td>{user1.blogs.length} blogs</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Userlist
