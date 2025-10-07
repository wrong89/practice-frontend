import { RoutePath } from "@/config/routeConfig/routeConfig";
import { isAuthenticated } from "@/utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const EntriesPage = () => {
    const isAuth = isAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate(RoutePath.login)
        }
    }, [])


    return (
        <>
            <h1>Все заявки:</h1>
        </>
    )
}

export default EntriesPage