import AuthForm from "@/components/AuthForm/AuthForm"
import { RoutePath } from "@/config/routeConfig/routeConfig"
import { Link } from "react-router"
import cls from "./LoginPage.module.scss"

const LoginPage = () => {
    return (
        <div className={cls.login}>
            <h1 className={cls.login__title}>Авторизация</h1>
            <AuthForm />
            <p className={cls.login__hint}>
                Еще не зарегистрированы?
                <Link className={cls.login__link} style={{ color: "#ff9800" }} to={RoutePath.register}>Регистрация</Link>
            </p>
        </div>
    )
}

export default LoginPage