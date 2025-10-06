
import { LoginPage } from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import type { RouteProps } from "react-router"


export enum AppRoutes {
    REGISTER = "register",
    LOGIN = "login"
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.REGISTER]: "/register",
    [AppRoutes.LOGIN]: "/"
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />
    }
}