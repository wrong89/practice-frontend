import { RoutePath } from '@/config/routeConfig/routeConfig';
import { Link } from 'react-router';
import cls from './Header.module.scss';

const Header = () => {
    // const userDataString = localStorage.getItem("user_data");

    // if (userDataString !== null) {
    //     console.log(JSON.parse(userDataString));
    // }

    return (
        <header className={cls.header}>
            <div className="container">
                <div className={cls.header__inner}>
                    <div className={cls.header__logo}>
                        <Link to={"/"}>Корочки.есть</Link>
                    </div>
                    <div className={cls.header__menu}>
                        <div className={cls.menu__item}>
                            <Link to={RoutePath.create_entry}>Создать заявку</Link>
                        </div>
                        <div className={cls.menu__item}>
                            <Link to={RoutePath.entries}>Заявки</Link>
                        </div>
                        <div className={cls.menu__item}>
                            <Link to={RoutePath.login}>Авторизация</Link>
                        </div>
                        <div className={cls.menu__item}>
                            <Link to={RoutePath.register}>Регистрация</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;