import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

function Dashboard() {

    const { username, isManager, isAdmin } = useAuth();

    return (
        <main className='container'>
            <p>welcome {username}!</p>

            <p><Link to="/dashboard/notes">View techNotes</Link></p>

            {(isManager || isAdmin) && <p><Link to="/dashboard/users">View User Settings</Link></p>}

        </main>
    );
}

export default Dashboard;