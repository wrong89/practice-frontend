import CreateEntryForm from "@/components/CreateEntryForm/CreateEntryForm";
import { RoutePath } from "@/config/routeConfig/routeConfig";
import { isAuthenticated } from "@/utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import cls from "./CreateEntryPage.module.scss";

const CreateEntryPage = () => {
    const isAuth = isAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate(RoutePath.login)
        }
    }, [])

    return (
        <div className={cls.entry}>
            <h1 className={cls.entry__title}>Создать заявку</h1>
            <CreateEntryForm />
        </div>
    )
}

export default CreateEntryPage