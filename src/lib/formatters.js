export function formatDate(dateString) {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "N/A"
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date)
}

export function formatDateTime(dateString) {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "N/A"
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(date)
}

export function getPriorityBadgeVariant(priority) {
    switch (priority?.toLowerCase()) {
        case "high":
            return "destructive"
        case "medium":
            return "warning"
        case "low":
            return "info"
        default:
            return "secondary"
    }
}

export function getStatusBadgeVariant(status) {
    switch (status?.toLowerCase()) {
        case "completed":
            return "success"
        case "in progress":
            return "info"
        case "pending":
            return "warning"
        default:
            return "secondary"
    }
}
