import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notifSlice = createSlice({
    name: 'notifReducer',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

export default notifSlice.reducer
export const { setNotification, clearNotification } = notifSlice.actions
