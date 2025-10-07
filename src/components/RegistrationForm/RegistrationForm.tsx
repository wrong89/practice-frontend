import { APIException } from "@/api/error";
import { ErrorMessages } from "@/api/error/errors";
import { registerUser } from "@/api/user";
import type { UserRegisterPayload } from "@/api/user/types";
import { RoutePath } from "@/config/routeConfig/routeConfig";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10); // оставляем максимум 10 цифр
    let formatted = "8(";
    if (digits.length > 0) formatted += digits.slice(0, 3);
    if (digits.length >= 4) formatted += ")" + digits.slice(3, 6);
    if (digits.length >= 7) formatted += "-" + digits.slice(6, 8);
    if (digits.length >= 9) formatted += "-" + digits.slice(8, 10);
    return formatted;
};

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<UserRegisterPayload>();
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState("");

    const onSubmit: SubmitHandler<UserRegisterPayload> = (data) => {
        console.log("Form data:", data);

        registerUser(data)
            .then((user) => {
                console.log("User:", user);
                navigate(RoutePath.login);
            })
            .catch((err) => {
                if (err instanceof APIException) {
                    const msg = ErrorMessages[err.messageFromServer];
                    if (msg) setErrMsg(msg);
                    console.log(err.messageFromServer);
                    console.log(err.time);
                    console.log(err.status);
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

            <Controller
                name="phone"
                control={control}
                rules={{
                    required: "Введите номер телефона",
                    pattern: {
                        value: /^8\d{10}$/,
                        message: "Введите 11 цифр номера телефона, начиная с 8",
                    },
                }}
                render={({ field }) => {
                    const digits = field.value || "";

                    // Форматируем номер как 8(XXX)XXX-XX-XX
                    let formatted = "";
                    if (digits.length > 0) formatted += digits[0] + "(";
                    if (digits.length >= 2) formatted += digits.slice(1, 4);
                    if (digits.length >= 5) formatted += ")" + digits.slice(4, 7);
                    if (digits.length >= 8) formatted += "-" + digits.slice(7, 9);
                    if (digits.length >= 10) formatted += "-" + digits.slice(9, 11);

                    return (
                        <TextField
                            required
                            label="Телефон"
                            variant="outlined"
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            value={formatted}
                            onChange={(e) => {
                                const inputDigits = e.target.value.replace(/\D/g, "");

                                // Ограничиваем до 11 цифр
                                let newDigits = inputDigits;
                                if (!newDigits.startsWith("8")) {
                                    newDigits = "8" + newDigits; // автоматически добавляем 8 в начале
                                }
                                field.onChange(newDigits.slice(0, 11));
                            }}
                        />
                    );
                }}
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
