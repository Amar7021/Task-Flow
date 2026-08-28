import * as yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
})

export const registerSchema = yup.object({
    username: yup
        .string()
        .trim()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
    email: yup
        .string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Passwords do not match"),
})
