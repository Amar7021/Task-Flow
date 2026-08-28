import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import StatCard from "@/pages/dashboard/components/StatCard"
import { CheckCircle2 } from "lucide-react"

describe("StatCard Component", () => {
    it("renders title, value, and description correctly", () => {
        render(
            <StatCard
                title="Completed Tasks"
                value={42}
                description="Tasks finished this week"
                icon={CheckCircle2}
                colorVariant="success"
            />
        )

        expect(screen.getByText("Completed Tasks")).toBeInTheDocument()
        expect(screen.getByText("42")).toBeInTheDocument()
        expect(screen.getByText("Tasks finished this week")).toBeInTheDocument()
    })

    it("triggers onClick callback when clicked", () => {
        const handleClick = vi.fn()
        render(
            <StatCard
                title="Pending Tasks"
                value={12}
                onClick={handleClick}
            />
        )

        const card = screen.getByText("Pending Tasks").closest("div")
        fireEvent.click(card)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
