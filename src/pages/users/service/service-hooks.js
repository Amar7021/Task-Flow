import { useQuery } from "@tanstack/react-query"
import { getAllUsersService } from "./service"
import { useSelector } from "react-redux"
import { auth } from "@/global-state/featureSlice/authSlice"

export const useUsers = () => {
    const { user: currentUser } = useSelector(auth)

    return useQuery({
        queryKey: ["users"],
        queryFn: getAllUsersService,
        select: data => {
            const list = data?.users || []
            return list.filter(u => u._id !== currentUser?._id)
        },
    })
}

export const useAllUsers = () => {
    return useQuery({
        queryKey: ["all-users"],
        queryFn: getAllUsersService,
        select: data => data?.users || [],
    })
}
