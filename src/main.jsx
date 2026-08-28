import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Provider } from "react-redux"
import store from "./global-state/store.js"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 10000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            gcTime: 5 * 60 * 1000,
        },
    },
})

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </StrictMode>
)
