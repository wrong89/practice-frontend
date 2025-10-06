import { Link } from 'react-router';
import cls from './Header.module.scss';

const Header = () => {
    return (
        <header className={cls.header}>
            <div className="container">
                <div className={cls.header__inner}>
                    <div className={cls.header__logo}>
                        <Link to={"/"}>Корочки.есть</Link>
                    </div>
                    <div className={cls.header__menu}>
                        <div className={cls.menu__item}>
                            <Link to={"/entry/create"}>Создать заявку</Link>
                        </div>
                        <div className={cls.menu__item}>
                            <Link to={"/entries"}>Заявки</Link>
                        </div>
                        <div className={cls.menu__item}>
                            <Link to={"/register"}>Регистрация</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;