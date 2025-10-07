import { userIsAdmin } from '@/api/user';
import { RoutePath } from '@/config/routeConfig/routeConfig';
import { getCurrentUser, isAuthenticated, logout } from '@/utils/auth';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import cls from './Header.module.scss';

const Header = () => {
    const currentUser = getCurrentUser();

    const [_, setIsAdmin] = useState(false);
    const isAuth = isAuthenticated();

    const navigate = useNavigate()

    if (currentUser != null && isAuth) {
        userIsAdmin(+currentUser.uid).then((res) => {
            setIsAdmin(res.is_admin)
        }).catch((err) => {
            console.log(err);
        })
    }

    const logoutHandler = () => {
        logout();
        // window.location.reload();
        // location.reload()
        navigate(RoutePath.login)
    }


    return (
        <header className={cls.header}>
            <div className="container">
                <div className={cls.header__inner}>
                    <div className={cls.header__logo}>
                        <Link to={"/"}>Корочки.есть</Link>
                    </div>
                    <div className={cls.header__menu}>
                        {isAuth ? <>
                            <div className={cls.menu__item}>
                                <Link to={RoutePath.create_entry}>Создать заявку</Link>
                            </div>
                            <div className={cls.menu__item}>
                                <Link to={RoutePath.entries}>Заявки</Link>
                            </div>
                            <div className={cls.menu__item}>
                                <Button variant='text' onClick={logoutHandler}>Выйти</Button>
                            </div>
                        </>
                            :
                            <>
                                <div className={cls.menu__item}>
                                    <Link to={RoutePath.login}>Авторизация</Link>
                                </div>
                                <div className={cls.menu__item}>
                                    <Link to={RoutePath.register}>Регистрация</Link>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;