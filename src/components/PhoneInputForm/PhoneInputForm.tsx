import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";

type FormValues = {
    phone: string;
};

const PhoneInputForm = () => {
    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues: { phone: "" },
    });

    const onSubmit = (data: FormValues) => {
        console.log("Raw phone:", data.phone.replace(/\D/g, "")); // только цифры
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="phone"
                control={control}
                rules={{
                    required: true,
                    pattern: /^\d{11}$/, // проверка: только цифры, длина 11 (8 + 10 цифр)
                }}
                render={({ field, fieldState }) => (
                    <InputMask
                        mask="8(999)999-99-99"
                        value={field.value}
                        onChange={field.onChange}
                    >
                        {(inputProps: any) => (
                            <TextField
                                {...inputProps}
                                label="Телефон"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error && "Введите корректный номер телефона"}
                            />
                        )}
                    </InputMask>
                )}
            />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default PhoneInputForm;
