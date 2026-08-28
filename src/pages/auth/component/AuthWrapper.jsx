import { BookOpen } from "lucide-react"
import { Link } from "react-router"

const AuthWrapper = ({ title, children }) => {
    return (
        <main className="min-h-screen">
            <section className="min-h-screen">
                <div className="grid min-h-screen lg:grid-cols-2">
                    <div className="flex items-center justify-center p-8">
                        <div className="w-full max-w-md">
                            <Link
                                to="/"
                                className="mb-10 inline-flex items-center gap-2"
                            >
                                <BookOpen className="size-6" />
                                <span className="text-lg font-semibold">
                                    Task Flow
                                </span>
                            </Link>
                            <h1 className="text-4xl font-bold">{title}</h1>
                            <div className="mt-8">{children}</div>
                        </div>
                    </div>
                    <div className="bg-muted hidden border-l lg:flex">
                        <div className="mx-auto flex max-w-md flex-col justify-center">
                            <h2 className="text-3xl font-bold">
                                Build your digital Task Flow.
                            </h2>
                            <p className="text-muted-foreground mt-4 leading-7">
                                Simple project management, built for focused
                                teams.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AuthWrapper
