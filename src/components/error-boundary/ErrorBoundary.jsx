import { useRouteError, Link } from "react-router"

export default function ErrorBoundary() {
    const error = useRouteError()

    const errorMessage =
        error?.message || error?.statusText || "Something unexpected happened."

    return (
        <main className="bg-background text-foreground flex min-h-svh items-center justify-center px-6">
            <div className="text-center">
                <p className="text-muted-foreground text-sm font-medium">
                    {error?.status || "Error"}
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                    Something went wrong
                </h1>
                <p className="text-muted-foreground mt-2"> {errorMessage}</p>
                <Link
                    to="/"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors"
                >
                    Go home
                </Link>
            </div>
        </main>
    )
}
