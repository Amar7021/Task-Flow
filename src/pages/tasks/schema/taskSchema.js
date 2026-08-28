import * as yup from "yup"

export const taskSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .required("Title is required")
        .max(150, "Title cannot exceed 150 characters"),
    description: yup
        .string()
        .trim()
        .max(2000, "Description cannot exceed 2000 characters")
        .optional(),
    assignedUser: yup
        .string()
        .required("Please assign this task to a team member"),
    priority: yup
        .string()
        .oneOf(["Low", "Medium", "High"], "Invalid priority")
        .required("Priority is required"),
    status: yup
        .string()
        .oneOf(["Pending", "In Progress", "Completed"], "Invalid status")
        .required("Status is required"),
    dueDate: yup
        .string()
        .required("Due date is required"),
})
