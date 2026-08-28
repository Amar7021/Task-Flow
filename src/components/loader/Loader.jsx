const PageLoader = ({ size = "md", className = "", loaderText }) => {
    const sizes = {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-[3px]",
    }

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-white/35 backdrop-blur-[1px]">
            <div className="flex items-center gap-2">
                <span
                    role="status"
                    aria-label="Loading"
                    className={`inline-block animate-spin rounded-full border-zinc-200 border-t-zinc-900 ${sizes[size]} ${className} `}
                />
                <span className="text-sm font-medium">
                    {loaderText && loaderText}
                </span>
            </div>
        </div>
    )
}

export default PageLoader
