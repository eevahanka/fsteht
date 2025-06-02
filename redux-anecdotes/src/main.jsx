import ReactDOM from 'react-dom/client'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import aneReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notifReducer from './reducers/notificationReducer'


const store = configureStore({
  reducer: {
    anes: aneReducer,
    filter: filterReducer,
    notifs: notifReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)