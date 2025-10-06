import type { FC, PropsWithChildren } from "react";
import Header from "../Header/Header";


const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default Layout