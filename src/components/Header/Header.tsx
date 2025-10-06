import { Link } from 'react-router';
import cls from './Header.module.scss';

const Header = () => {
    return (
        <header className={cls.header}>
            <div className="container">
                <div className={cls.header__inner}>
                    <Link to={"/register"}>Register</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;