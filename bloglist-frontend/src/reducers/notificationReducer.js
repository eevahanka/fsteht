import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notificationReducer',
  initialState,
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      return content
    },
    clearNotification() {
      return ''
    },
  },
})

export const notification = (content, time) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(content))
    setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions
