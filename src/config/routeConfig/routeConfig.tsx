
import { CreateEntryPage } from "@/pages/CreateEntryPage"
import { EntriesPage } from "@/pages/EntriesPage"
import { LoginPage } from "@/pages/LoginPage"
import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { RegisterPage } from "@/pages/RegisterPage"
import type { RouteProps } from "react-router"


export enum AppRoutes {
    MAIN = "main",
    REGISTER = "register",
    LOGIN = "login",
    ENTRIES = "entries",
    CREATE_ENTRY = "create_entry",
    NOT_FOUND = "not_found"
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.REGISTER]: "/register",
    [AppRoutes.LOGIN]: "/login",
    [AppRoutes.CREATE_ENTRY]: "/entry/create",
    [AppRoutes.ENTRIES]: "/entries",
    [AppRoutes.NOT_FOUND]: "*"
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />
    },
    [AppRoutes.ENTRIES]: {
        path: RoutePath.entries,
        element: <EntriesPage />
    },
    [AppRoutes.CREATE_ENTRY]: {
        path: RoutePath.create_entry,
        element: <CreateEntryPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />
    }
}