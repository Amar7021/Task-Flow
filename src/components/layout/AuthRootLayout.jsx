import { logout, setUser } from "@/global-state/featureSlice/authSlice"
import { useDispatch } from "react-redux"
import { Navigate, Outlet } from "react-router"
import { Sidebar } from "./sidebar/Sidebar"
import { Header } from "./header/Header"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "../../api/api"
import PageLoader from "../loader/Loader"

const AuthRootLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()

    const { isPending, error, data } = useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            const response = await api.get("/auth/user")
            return response.data
        },
        retry: false,
    })

    useEffect(() => {
        if (data?.user) {
            dispatch(setUser(data.user))
        } else if (error?.status === 401) {
            dispatch(logout())
        }
    }, [data, error, dispatch])

    if (isPending) {
        return <PageLoader loaderText="Loading..." />
    }

    if (error || !data?.user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="bg-background min-h-screen">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="lg:pl-60">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="min-h-[calc(100vh-4rem)]">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AuthRootLayout
