import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notifSlice = createSlice({
    name: 'notifReducer',
    initialState,
    reducers: {
        setNotification(state, action) {
            const content = action.payload
            return content
        },
        clearNotification() {
            return ''
        }
    }
})

export const notif = (content, time) => {
    return async dispatch => {
        dispatch(notifSlice.actions.setNotification(content))
        setTimeout(() => {
            dispatch(notifSlice.actions.clearNotification())
        }, time * 1000)
    }
}

export default notifSlice.reducer
export const { setNotification, clearNotification } = notifSlice.actions
