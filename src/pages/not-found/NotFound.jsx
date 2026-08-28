import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { useNavigate } from "react-router"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <main className="bg-background text-foreground flex min-h-[100svh] flex-1 items-center justify-center px-6">
            <div className="w-full max-w-md text-center">
                <p className="text-muted-foreground mb-2 text-sm font-medium tracking-[0.2em] uppercase">
                    Error 404
                </p>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    Page not found
                </h1>
                <p className="text-muted-foreground mx-auto mt-4 max-w-sm text-base leading-7">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="size-4" />
                        Go back
                    </Button>
                    <Button type="button" onClick={() => navigate("/")}>
                        <Home className="size-4" />
                        Go home
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default NotFound
