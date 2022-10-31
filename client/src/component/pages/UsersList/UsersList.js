import { useGetUsersQuery } from '../../../app/services/users';
import User from './User';
import { Spinner } from '../../shared';
import { Link } from 'react-router-dom';
import styles from './UsersList.module.scss';

function UsersList() {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();


    let content;

    if (isLoading) {
        return <Spinner />;
    }

    if (isSuccess) {

        const { ids } = users;

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null;

        content = (
            <section className='container'>
                <div className={styles['add-user']}>
                    <Link
                        to='/dashboard/users/add'
                        className='btn'
                    >
                        Add New User
                    </Link>

                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Roles</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </section>
        );
    }

    return content;
}

export default UsersList;