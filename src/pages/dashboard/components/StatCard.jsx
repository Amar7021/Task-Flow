import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const StatCard = React.memo(function StatCard({
    title,
    value,
    icon: Icon,
    colorVariant = "primary",
}) {
    const colorStyles = {
        primary: {
            bg: "bg-primary/10",
            text: "text-primary",
            border: "border-primary/20",
        },
        warning: {
            bg: "bg-amber-500/10",
            text: "text-amber-600 dark:text-amber-400",
            border: "border-amber-500/20",
        },
        info: {
            bg: "bg-sky-500/10",
            text: "text-sky-600 dark:text-sky-400",
            border: "border-sky-500/20",
        },
        success: {
            bg: "bg-emerald-500/10",
            text: "text-emerald-600 dark:text-emerald-400",
            border: "border-emerald-500/20",
        },
        destructive: {
            bg: "bg-rose-500/10",
            text: "text-rose-600 dark:text-rose-400",
            border: "border-rose-500/20",
        },
    }

    const currentStyle = colorStyles[colorVariant] || colorStyles.primary

    return (
        <Card
            className={cn(
                "relative overflow-hidden transition-all duration-200 hover:shadow-md",
            )}
        >
            <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                            {title}
                        </p>
                        <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {value}
                        </p>
                    </div>
                    {Icon && (
                        <div
                            className={cn(
                                "flex size-11 items-center justify-center rounded-xl border",
                                currentStyle.bg,
                                currentStyle.text,
                                currentStyle.border
                            )}
                        >
                            <Icon className="size-5" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
})

export default StatCard
