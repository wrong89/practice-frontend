import { APIException } from "@/api/error";
import { ErrorMessages } from "@/api/error/errors";
import { registerUser } from "@/api/user";
import type { UserRegisterPayload } from "@/api/user/types";
import { RoutePath } from "@/config/routeConfig/routeConfig";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterPayload>();
    const navigate = useNavigate()

    const [errMsg, setErrMsg] = useState("")

    const onSubmit: SubmitHandler<UserRegisterPayload> = (data) => {
        console.log("Form data:", data);

        registerUser(data).then((user) => {
            console.log("User:", user);
            navigate(RoutePath.login)
        }).catch((err) => {
            if (err instanceof APIException) {
                const msg = ErrorMessages[err.messageFromServer]
                if (msg) {
                    setErrMsg(msg)
                }
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
            onSubmit={handleSubmit(onSubmit)}
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
                {...register("password", { required: true, minLength: 3 })}
                label="Пароль"
                type="password"
                variant="outlined"
            />

            <TextField
                required
                error={!!errors.name}
                helperText={errors.name && "Введите имя"}
                {...register("name", { required: true })}
                label="Имя"
                variant="outlined"
            />

            <TextField
                required
                error={!!errors.surname}
                helperText={errors.surname && "Введите фамилию"}
                {...register("surname", { required: true })}
                label="Фамилия"
                variant="outlined"
            />

            <TextField
                required
                error={!!errors.patronymic}
                helperText={errors.patronymic && "Введите отчество (если есть)"}
                {...register("patronymic")}
                label="Отчество"
                variant="outlined"
            />

            <TextField
                required
                error={!!errors.phone}
                helperText={errors.phone && "Введите корректный номер телефона"}
                {...register("phone", {
                    required: true,
                    pattern: /^\d{10,12}$/,
                })}
                label="Телефон"
                variant="outlined"
            />

            <TextField
                required
                error={!!errors.email}
                helperText={errors.email && "Введите корректный email"}
                {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                label="Email"
                variant="outlined"
            />

            {errMsg && <p style={{ color: "red", textAlign: "center" }}>{errMsg}</p>}

            <Button type="submit" variant="contained">
                Зарегистрироваться
            </Button>
        </Box>
    );
};

export default RegistrationForm;