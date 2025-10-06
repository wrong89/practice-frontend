import { RoutePath } from "@/config/routeConfig/routeConfig"
import { Link } from "react-router"
import cls from "./NotFoundPage.module.scss"


const NotFoundPage = () => {
    return (
        <div className={cls.notfound}>
            <div>
                <p className={cls.notfound__text}>
                    404 - страница не найдена
                </p>
                <Link className={cls.notfound__back} to={RoutePath.main}>Вернуться на главную</Link>
            </div>
        </div>
    )
}

export default NotFoundPage