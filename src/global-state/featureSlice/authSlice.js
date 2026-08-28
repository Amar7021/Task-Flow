import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthenticated: false,
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: state => {
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const { setUser, logout } = AuthSlice.actions

export const auth = state => state.auth

export default AuthSlice.reducer
