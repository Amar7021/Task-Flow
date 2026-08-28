import { Button } from "@/components/ui/button"
import { useLogout } from "@/pages/auth/service/service-hooks"
import { LayoutDashboard, ListTodo, LogOut, X } from "lucide-react"
import { Link, NavLink } from "react-router"

const navigation = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
    },
    {
        label: "Tasks",
        icon: ListTodo,
        href: "/tasks",
    },
]

export function Sidebar({ open, onClose }) {
    const { mutate: logoutUser } = useLogout()

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            <aside
                className={`border-sidebar-border bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r transition-transform duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} `}
            >
                <div className="border-sidebar-border flex h-16 items-center justify-between border-b px-5">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 font-semibold tracking-tight"
                    >
                        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
                            T
                        </div>
                        <span className="text-lg">TaskFlow</span>
                    </Link>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        className="hover:bg-sidebar-accent lg:hidden"
                        // aria-label="Close sidebar"
                    >
                        <X className="size-5" />
                    </Button>
                </div>
                <nav className="flex-1 space-y-1 p-3">
                    <p className="text-sidebar-foreground/50 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
                        Workspace
                    </p>
                    {navigation.map(item => {
                        const Icon = item.icon
                        return (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"} `
                                }
                            >
                                {" "}
                                <Icon className="size-4.5 shrink-0" />{" "}
                                <span>{item.label}</span>{" "}
                            </NavLink>
                        )
                    })}
                </nav>
                <div className="border-sidebar-border space-y-1 border-t p-3">
                    <Button
                        type="button"
                        className={"w-full"}
                        onClick={() => logoutUser()}
                    >
                        <LogOut className="size-4.5" />
                        <span>Logout</span>
                    </Button>
                </div>
            </aside>
        </>
    )
}
