import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../../app/services/users';

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`);

        const userRolesString = user.roles.toString().replaceAll(',', ', ');

        return (
            <tr >
                <td >{user.username}</td>
                <td >{userRolesString}</td>
                <td >
                    <button onClick={handleEdit} >Edit</button>
                </td>
            </tr>
        );

    } else {
        return null;
    }
};
export default User;