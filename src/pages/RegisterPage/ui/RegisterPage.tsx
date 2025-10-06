import RegistrationForm from "@/components/RegistrationForm/RegistrationForm"
import cls from "./RegisterPage.module.scss"

const RegisterPage = () => {
    return (
        <div className={cls.register}>
            <h1 className={cls.register__title}>Регистрация</h1>
            <RegistrationForm />
        </div>
    )
}

export default RegisterPage