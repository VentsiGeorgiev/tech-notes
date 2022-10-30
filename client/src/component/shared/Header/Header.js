import { Link, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../../app/services/auth';
import useAuth from '../../../hooks/useAuth';
import styles from './Header.module.scss';

function Header() {

    const { username } = useAuth();
    const [sendLogout, { isLoading }] = useSendLogoutMutation();
    const navigate = useNavigate();

    const handleClick = () => {
        sendLogout();
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <section className={`container ${styles.header__wrapper}`}>
                <Link to='/'>
                    <h1 className={styles.header__logo}>techNotes</h1>
                </Link>
                <menu>
                    <ul className={styles.header__navigation}>
                        {username
                            ? <button
                                onClick={handleClick}
                                className='btn'
                            >
                                Logout
                            </button>
                            :
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        }

                    </ul>
                </menu>
            </section>
        </header>
    );
}

export default Header;