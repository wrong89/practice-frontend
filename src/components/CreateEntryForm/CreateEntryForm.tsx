import { createEntry } from "@/api/entry";
import type { CreateEntry } from "@/api/entry/types";
import { APIException } from "@/api/error";
import { ErrorMessages } from "@/api/error/errors";
import { RoutePath } from "@/config/routeConfig/routeConfig";
import { getCurrentUser } from "@/utils/auth";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

type CreateEntryInputs = {
    course: string;
    date: string;
    payment_method: string;
};

const CreateEntryForm = () => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CreateEntryInputs>();
    const navigate = useNavigate()
    const [msg, setMsg] = useState("")


    const onSubmit: SubmitHandler<CreateEntryInputs> = (data) => {
        const user = getCurrentUser()
        if (!user) {
            console.log("User not found")
            navigate(RoutePath.login)
            return
        }

        const entry: CreateEntry = {
            ...data,
            user_id: +user.uid
        }


        console.log("Entry data:", entry);

        createEntry(entry, user.token).then((res) => {
            console.log("Created entry:", res);

        }).catch((err) => {
            if (err instanceof APIException) {
                const msg = ErrorMessages[err.messageFromServer]
                if (msg) {
                    setMsg(msg)
                } else {
                    setMsg("Неизвестная ошибка")
                }
                console.log(err.messageFromServer); // "invalid phone number"
                console.log(err.time);              // "2025-10-06T21:38:45.1919612+03:00"
                console.log(err.status);            // HTTP статус от сервера
            } else {
                console.log(err);
            }
        })
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: 400,
                mx: "auto",
                mt: 4,
            }}
        >
            {/* Course Select */}
            <FormControl fullWidth error={!!errors.course}>
                <InputLabel id="course-label">Курс</InputLabel>
                <Controller
                    name="course"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Выберите курс" }}
                    render={({ field }) => (
                        <Select {...field} labelId="course-label" label="Курс">
                            <MenuItem value="">
                                <em>Не выбрано</em>
                            </MenuItem>
                            <MenuItem value="frontend">Frontend-разработка</MenuItem>
                            <MenuItem value="backend">Backend-разработка</MenuItem>
                            <MenuItem value="design">UI/UX-дизайн</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>

            <TextField
                required
                label="Дата"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date?.message || ""}
                {...register("date", {
                    required: "Введите дату",
                    validate: (value) => {
                        const date = new Date(value);
                        const minDate = new Date("2020-01-01");
                        const maxDate = new Date("2100-01-01");

                        if (isNaN(date.getTime())) {
                            return "Некорректная дата";
                        }
                        if (date < minDate) {

                            return `Дата не может быть раньше ${minDate.getFullYear()} года`;
                        }
                        if (date > maxDate) {
                            return "Дата не может быть далеким будущем";
                        }
                        return true;
                    },
                })}
            />

            {/* Payment Method Select */}
            <FormControl fullWidth error={!!errors.payment_method}>
                <InputLabel id="payment-label">Метод оплаты</InputLabel>
                <Controller
                    name="payment_method"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Выберите метод оплаты" }}
                    render={({ field }) => (
                        <Select {...field} labelId="payment-label" label="Метод оплаты">
                            <MenuItem value="">
                                <em>Не выбрано</em>
                            </MenuItem>
                            <MenuItem value="cash">Наличные</MenuItem>
                            <MenuItem value="card">Банковская карта</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>

            {msg && <p style={{ color: "red", textAlign: "center" }}>{msg}</p>}

            <Button type="submit" variant="contained">
                Создать запись
            </Button>
        </Box>
    );
};

export default CreateEntryForm;
