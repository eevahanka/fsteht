import { configureStore } from "@reduxjs/toolkit"
import aneReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"
import notifReducer from "./reducers/notificationReducer"
// import thunk from "redux-thunk"

const store = configureStore({
  reducer: {
    anes: aneReducer,
    filter: filterReducer,
    notifs: notifReducer
}
// ,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})
export default store