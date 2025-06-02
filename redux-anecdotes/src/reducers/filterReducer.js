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

// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             // console.log('filterReducer', action.payload)
//             return action.payload
//         default:
//             return state
//     }
//     }

// export const filterChange = filter => {
//     return {
//         type: 'SET_FILTER',
//         payload: filter
//     }
// }

// export default filterReducer