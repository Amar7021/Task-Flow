import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { taskSchema } from "../schema/taskSchema"
import { useUsers } from "@/pages/users/service/service-hooks"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"

export default function TaskModal({
    open,
    onOpenChange,
    task = null,
    onSubmit,
    isSubmitting,
}) {
    const isEdit = Boolean(task?._id)
    const { data: users = [], isLoading: usersLoading } = useUsers()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            assignedUser: "",
            priority: "Medium",
            status: "Pending",
            dueDate: "",
        },
    })

    useEffect(() => {
        if (open) {
            if (task) {
                const formattedDueDate = task.dueDate
                    ? new Date(task.dueDate).toISOString().split("T")[0]
                    : ""

                const assignedUserId =
                    typeof task.assignedUser === "object"
                        ? task.assignedUser?._id
                        : task.assignedUser || ""

                reset({
                    title: task.title || "",
                    description: task.description || "",
                    assignedUser: assignedUserId,
                    priority: task.priority || "Medium",
                    status: task.status || "Pending",
                    dueDate: formattedDueDate,
                })
            } else {
                reset({
                    title: "",
                    description: "",
                    assignedUser: users.length > 0 ? users[0]._id : "",
                    priority: "Medium",
                    status: "Pending",
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0],
                })
            }
        }
    }, [open, task, users, reset])

    const handleFormSubmit = values => {
        onSubmit(values)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Task" : "Create New Task"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update task details and assignments."
                            : "Add a new task to your workspace and assign team members."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-4"
                >
                    <Field>
                        <FieldLabel>Task Title</FieldLabel>
                        <FieldContent>
                            <Input
                                placeholder="e.g. Implement OAuth Flow"
                                {...register("title")}
                                className={errors.title ? "border-destructive" : ""}
                            />
                            <FieldError>{errors.title?.message}</FieldError>
                        </FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>Description</FieldLabel>
                        <FieldContent>
                            <Textarea
                                placeholder="Describe the task in detail..."
                                rows={3}
                                {...register("description")}
                                className={
                                    errors.description ? "border-destructive" : ""
                                }
                            />
                            <FieldError>{errors.description?.message}</FieldError>
                        </FieldContent>
                    </Field>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field>
                            <FieldLabel>Priority</FieldLabel>
                            <FieldContent>
                                <Controller
                                    control={control}
                                    name="priority"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="High">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FieldError>{errors.priority?.message}</FieldError>
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <FieldContent>
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="In Progress">In Progress</SelectItem>
                                                <SelectItem value="Completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FieldError>{errors.status?.message}</FieldError>
                            </FieldContent>
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field>
                            <FieldLabel>Assign User</FieldLabel>
                            <FieldContent>
                                <Controller
                                    control={control}
                                    name="assignedUser"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={usersLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        usersLoading
                                                            ? "Loading users..."
                                                            : "Select assignee"
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map(u => (
                                                    <SelectItem
                                                        key={u._id}
                                                        value={u._id}
                                                    >
                                                        {u.username || u.name || u.email}
                                                    </SelectItem>
                                                ))}
                                                {users.length === 0 && (
                                                    <SelectItem
                                                        value="none"
                                                        disabled
                                                    >
                                                        No other users found
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FieldError>{errors.assignedUser?.message}</FieldError>
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel>Due Date</FieldLabel>
                            <FieldContent>
                                <Input
                                    type="date"
                                    {...register("dueDate")}
                                    className={errors.dueDate ? "border-destructive" : ""}
                                />
                                <FieldError>{errors.dueDate?.message}</FieldError>
                            </FieldContent>
                        </Field>
                    </div>

                    <DialogFooter className="pt-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? isEdit
                                    ? "Saving..."
                                    : "Creating..."
                                : isEdit
                                    ? "Save"
                                    : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
