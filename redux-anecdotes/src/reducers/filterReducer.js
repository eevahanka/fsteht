import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filrerSlice = createSlice({
    name:'filterReducer',
    initialState,
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})

export default filrerSlice.reducer
export const { filterChange} = filrerSlice.actions
