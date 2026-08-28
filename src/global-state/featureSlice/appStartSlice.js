import { createSlice } from "@reduxjs/toolkit"

export const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
}

const applyTheme = mode => {
    const isDark =
        mode === "dark" || (mode === "system" && getSystemTheme() === "dark")

    document.documentElement.classList.toggle("dark", isDark)
}

const appStartSlice = createSlice({
    initialState: {
        theme: localStorage.getItem("theme") || "system",
    },
    name: "appStart",
    reducers: {
        toggleTheme: (state, { payload }) => {
            state.theme = payload
            if (payload === "system") {
                localStorage.removeItem("theme")
            } else {
                localStorage.setItem("theme", payload)
            }

            applyTheme(payload)
        },
    },
})

export const { toggleTheme } = appStartSlice.actions

export const appStart = state => state.appStart

export default appStartSlice.reducer
