import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.scss';

function Dashboard() {

    const { username, isManager, isAdmin } = useAuth();

    return (
        <main className='container'>
            <section className={styles.dashboard}>
                <h2 className={styles.dashboard__message}>Welcome {username}!</h2>
                <div className={styles.dashboard__notes}>
                    <h3 className={styles.dashboard__notes__title}>Notes</h3>
                    <ul>
                        <li>
                            <Link className='btn' to="/dashboard/notes">View techNotes</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.dashboard__users}>
                    <h3 className={styles.dashboard__users__title}>User</h3>
                    {(isManager || isAdmin) &&
                        <ul>
                            <li>
                                <Link className='btn' to="/dashboard/users/add">Add New User</Link>
                            </li>
                            <li>
                                <Link className='btn' to="/dashboard/users">View User Settings</Link>
                            </li>
                        </ul>
                    }
                </div>
            </section>

        </main>
    );
}

export default Dashboard;