import { configureStore } from "@reduxjs/toolkit"
import appStartReducer from "./featureSlice/appStartSlice"
import authReducer from "./featureSlice/authSlice"

const store = configureStore({
    reducer: {
        appStart: appStartReducer,
        auth: authReducer,
    },
})

export default store
