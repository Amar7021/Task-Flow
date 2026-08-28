import { useMutation } from "@tanstack/react-query"
import { loginServie, logoutServie, registerServie } from "./service"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { setUser } from "@/global-state/featureSlice/authSlice"

export const useLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: loginServie,
        onSuccess: data => {
            // console.log({ data })
            if (data.success) {
                dispatch(setUser(data.user))
                toast.success(data.message)
                navigate("/", { replace: true })
            }
        },
        onError: error => {
            toast.error(error.response?.data?.message || "Login failed")
        },
    })
}

export const useRegister = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: registerServie,
        onSuccess: data => {
            // console.log({ data })
            if (data.success) {
                dispatch(setUser(data.user))
                toast.success(data.message)
                navigate("/", { replace: true })
            }
        },
        onError: error => {
            toast.error(error.response?.data?.message || "Login failed")
        },
    })
}

export const useLogout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: logoutServie,
        onSuccess: data => {
            // console.log({ data })
            if (data.success) {
                dispatch(setUser(data.user))
                toast.success(data.message)
                navigate("/login", { replace: true })
            }
        },
        onError: error => {
            toast.error(error.response?.data?.message || "Login failed")
        },
    })
}
