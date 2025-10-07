import { getEntries } from "@/api/entry";
import type { Entry } from "@/api/entry/types";
import { APIException } from "@/api/error";
import { ErrorMessages } from "@/api/error/errors";
import { RoutePath } from "@/config/routeConfig/routeConfig";
import { getCurrentUser, isAuthenticated } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import EntriesList from "@/components/EntriesList/EntriesList";
import cls from "./EntriesPage.module.scss";

const EntriesPage = () => {
    const isAuth = isAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate(RoutePath.login)
        }
    }, [])

    const [entries, setEntries] = useState<Entry[]>([])
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(true)

    const user = getCurrentUser()
    if (!user) {
        console.log("User not found")
        navigate(RoutePath.login)
        return
    }

    useEffect(() => {
        getEntries(user.token).then((res) => {
            setEntries(res)
            console.log("res", res)
            setLoading(false)
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
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={cls.entries}>
            <h1 className={cls.entries__title}>Заявки</h1>
            {msg && <p style={{ color: "red", textAlign: "center" }}>{msg}</p>}
            <EntriesList entries={entries} userID={+user.uid} />
        </div>
    )
}

export default EntriesPage