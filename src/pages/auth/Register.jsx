import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import AuthWrapper from "./component/AuthWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Link } from "react-router"
import { registerSchema } from "./schema"
import { useRegister } from "./service/service-hooks"

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    })

    const { mutate, isPending } = useRegister()

    const onSubmit = values => {
        const { username, email, password } = values
        mutate({ username, email, password })
    }

    return (
        <AuthWrapper title="Create your account">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Field>
                    <FieldLabel>Name</FieldLabel>
                    <FieldContent>
                        <Input
                            placeholder="Enter Name"
                            {...register("username")}
                            className={
                                errors.username
                                    ? "border-destructive focus-visible:ring-destructive"
                                    : ""
                            }
                        />
                        <FieldError>{errors.username?.message}</FieldError>
                    </FieldContent>
                </Field>
                <Field>
                    <FieldLabel>Email</FieldLabel>
                    <FieldContent>
                        <Input
                            placeholder="Enter Email"
                            {...register("email")}
                            className={
                                errors.email
                                    ? "border-destructive focus-visible:ring-destructive"
                                    : ""
                            }
                        />
                        <FieldError>{errors.email?.message}</FieldError>
                    </FieldContent>
                </Field>
                <Field>
                    <FieldLabel>Password</FieldLabel>
                    <FieldContent>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                {...register("password")}
                                className={
                                    errors.password
                                        ? "border-destructive focus-visible:ring-destructive"
                                        : ""
                                }
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>
                        <FieldError>{errors.password?.message}</FieldError>
                    </FieldContent>
                </Field>
                <Field>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <FieldContent>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                {...register("confirmPassword")}
                                className={
                                    errors.confirmPassword
                                        ? "border-destructive focus-visible:ring-destructive"
                                        : ""
                                }
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(prev => !prev)
                                }
                                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 flex items-center"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>
                        <FieldError>
                            {errors.confirmPassword?.message}
                        </FieldError>
                    </FieldContent>
                </Field>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Creating Account..." : "Create Account"}
                </Button>
                <p className="text-muted-foreground text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </AuthWrapper>
    )
}

export default Register
