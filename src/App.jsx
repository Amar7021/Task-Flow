import { RouterProvider } from "react-router"
import router from "./routes/Routes"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toggleTheme } from "./global-state/featureSlice/appStartSlice"
import { Toaster } from "@/components/ui/sonner"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const stored = localStorage.getItem("theme") || "system"
        dispatch(toggleTheme(stored))
    }, [dispatch])

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)")

        const listener = () => {
            const stored = localStorage.getItem("theme")
            if (!stored) {
                dispatch(toggleTheme("system"))
            }
        }

        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [dispatch])

    return (
        <>
            <Toaster />
            <RouterProvider router={router} />
        </>
    )
}

export default App
