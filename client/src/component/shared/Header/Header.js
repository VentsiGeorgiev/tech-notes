import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
    return (
        <header className={styles.header}>
            <section className={`container ${styles.header__wrapper}`}>
                <Link to='/'>
                    <h1 className={styles.header__logo}>techNotes</h1>
                </Link>
                <menu>
                    <ul className={styles.header__navigation}>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                    </ul>
                </menu>
            </section>
        </header>
    );
}

export default Header;