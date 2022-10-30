import { useGetUsersQuery } from '../../../app/services/users';

function UsersList() {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();

    console.log(users);


    return (
        <div>UsersList</div>
    );
}

export default UsersList;