import { useGetUsersQuery } from '../../../app/services/users';
import User from './User';
import { Spinner } from '../../shared';

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