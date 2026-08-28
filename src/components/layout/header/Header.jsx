import { Button } from "@/components/ui/button"
import {
    appStart,
    toggleTheme,
} from "@/global-state/featureSlice/appStartSlice"
import { auth } from "@/global-state/featureSlice/authSlice"
import { Menu, Bell, Sun, Moon, Monitor, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export function Header({ onMenuClick }) {
    const [themeOpen, setThemeOpen] = useState(false)
    const { user } = useSelector(auth)
    const { theme } = useSelector(appStart)

    const dispatch = useDispatch()

    const handleThemeChange = value => {
        dispatch(toggleTheme(value))
        setThemeOpen(false)
    }
    const themeButtonClass = value =>
        ` flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${theme === value ? "bg-accent text-accent-foreground" : "hover:bg-muted"} `

    return (
        <header className="border-border bg-background/95 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    onClick={onMenuClick}
                    size="icon"
                    className="hover:bg-muted rounded-lg p-2 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
                <div className="relative">
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setThemeOpen(value => !value)}
                    >
                        <Sun className="size-4 dark:hidden" />
                        <Moon className="hidden size-4 dark:block" />
                        <ChevronDown className="hidden size-3.5 sm:block" />
                    </Button>
                    {themeOpen && (
                        <div className="border-border bg-popover absolute top-11 right-0 w-36 rounded-lg border p-1 shadow-lg">
                            <button
                                type="button"
                                className={themeButtonClass("light")}
                                onClick={() => handleThemeChange("light")}
                            >
                                <Sun className="size-4" />
                                Light
                            </button>
                            <button
                                type="button"
                                className={themeButtonClass("dark")}
                                onClick={() => handleThemeChange("dark")}
                            >
                                <Moon className="size-4" />
                                Dark
                            </button>
                            <button
                                type="button"
                                className={themeButtonClass("system")}
                                onClick={() => handleThemeChange("system")}
                            >
                                <Monitor className="size-4" />
                                System
                            </button>
                        </div>
                    )}
                </div>
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <div className="bg-border mx-1 hidden h-6 w-px sm:block" />
                <button
                    type="button"
                    className="hover:bg-muted flex items-center gap-2 rounded-lg p-1.5 pr-2 transition-colors"
                >
                    <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full text-xs font-semibold">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden text-left sm:block">
                        <p className="text-sm leading-none font-medium">
                            {user?.username}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                            Admin
                        </p>
                    </div>
                </button>
            </div>
        </header>
    )
}
