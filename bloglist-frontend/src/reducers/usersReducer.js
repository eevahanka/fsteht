import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'usersReducer',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    default(state, action) {
      return state
    },
  },
})
export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers()
    dispatch(setUsers(users))
  }
}
export default usersSlice.reducer
