import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogReducer',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    default(state, action) {
      return state
    }
  }
})

export default blogSlice.reducer
export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = newBlog => {
  return async dispatch => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(addBlog(createdBlog))
  }
}