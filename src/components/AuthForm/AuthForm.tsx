import { APIException } from "@/api/error";
import { loginUser } from "@/api/user";
import type { User } from "@/api/user/types";
import { RoutePath } from "@/config/routeConfig/routeConfig";
import { setCurrentUser } from "@/utils/auth";
import { Box, Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

type AuthInputs = {
    login: string;
    password: string;
};

const AuthForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthInputs>();
    const navigate = useNavigate()

    const handleFormSubmit: SubmitHandler<AuthInputs> = (data) => {
        console.log("form data", data)

        loginUser(data).then((data) => {
            console.log("Token:", data.token);

            const decodedToken = jwtDecode<User>(data.token);
            console.log("Decoded Token", decodedToken);

            setCurrentUser(decodedToken)

            navigate(RoutePath.main)
        }).catch((err) => {
            if (err instanceof APIException) {
                console.log(err.messageFromServer); // "invalid phone number"
                console.log(err.time);              // "2025-10-06T21:38:45.1919612+03:00"
                console.log(err.status);            // HTTP статус от сервера
            } else {
                console.log(err);
            }
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                mx: "auto",
                mt: 4,
            }}
        >
            <TextField
                required
                error={!!errors.login}
                helperText={errors.login?.message}
                {...register("login", {
                    required: "Введите логин",
                    minLength: { value: 6, message: "Минимум 6 символов" },
                    pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message: "Только латинские буквы и цифры",
                    },
                })}
                label="Логин"
                variant="outlined"
            />

            <TextField
                required
                error={!!errors.password}
                helperText={errors.password && "Пароль должен быть длиннее 8 символов"}
                // {...register("password", { required: true, minLength: 8 })}
                {...register("password", { required: true, minLength: 3 })}
                label="Пароль"
                type="password"
                variant="outlined"
            />

            <Button type="submit" variant="contained">
                Войти
            </Button>
        </Box>
    );
};

export default AuthForm;
