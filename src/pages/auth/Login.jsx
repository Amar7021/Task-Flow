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
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { loginSchema } from "./schema"
import { Link } from "react-router"
import { useLogin } from "./service/service-hooks"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    })

    const { mutate, isPending } = useLogin()
    const onSubmit = values => {
        console.log({ values })
        mutate(values)
    }

    return (
        <AuthWrapper title="Welcome Back">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                className={
                                    errors.password
                                        ? "border-destructive focus-visible:ring-destructive"
                                        : ""
                                }
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        <FieldError>{errors.password?.message}</FieldError>
                    </FieldContent>
                </Field>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing In..." : "Sign In"}
                </Button>
                <p className="text-muted-foreground text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </AuthWrapper>
    )
}

export default Login
