import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById, useDeleteUserMutation, useUpdateUserMutation } from '../../../app/services/users';
import { Alert, Spinner } from '../../shared';
import { useEffect, useState } from 'react';
import { ROLES } from '../../../utils/roles';

function EditUser() {
    const { id } = useParams();

    const user = useSelector(state => selectUserById(state, id));

    const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        isLoading: isDelLoading,
        error: delError
    }] = useDeleteUserMutation();


    const [username, setUsername] = useState(user?.username);
    const [password, setPassword] = useState('');
    const [active, setActive] = useState(user?.active);
    const [roles, setRoles] = useState(user?.roles);

    const navigate = useNavigate();

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRoles(values);
    };
    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}
            > {role}</option >
        );
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onUpdate = async () => {
        await updateUser({ id: id, username, password, roles, active });
    };

    const onDelete = async () => {
        await deleteUser({ id: id });
    };

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('');
            setPassword('');
            setRoles([]);
            navigate('/dashboard/users');
        }

    }, [isSuccess, isDelSuccess, navigate]);

    if (isLoading || isDelLoading) {
        return <Spinner />;
    }

    return (
        <>
            {isError && <Alert message={error?.data?.message} />}
            {isDelError && <Alert message={delError?.data?.message} />}
            <form onSubmit={handleSubmit} className='form'>
                <h2 className='form__title'>Edit User</h2>
                <div className='form__input'>
                    <label
                        htmlFor='username'
                        className='form__input__label'
                    >
                        Username</label>
                    <input
                        id='username'
                        type='text'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='form__input__field'
                    />
                </div>
                <div className='form__input'>
                    <label
                        htmlFor='password'
                        className='form__input__label'
                    >Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form__input__field'
                    />
                </div>
                <div className='form__input'>
                    <input
                        id='user-active'
                        type='checkbox'
                        name='user-active'
                        checked={active}
                        onChange={() => setActive((prevState) => !prevState)}
                        className='form__input__persist'
                    />
                    <label
                        htmlFor='persist'
                    >Active</label>
                </div>
                <div className='form__input'>
                    <label
                        htmlFor='roles'
                        className='form__input__label'
                    >
                        Assigned roles
                    </label>
                    <select
                        id='roles'
                        name='roles'
                        multiple={true}
                        size='3'
                        value={roles}
                        onChange={onRolesChanged}
                        className='form__input__field'
                    >{options}</select>
                </div>
                <div className='form__input'>
                    <div className='form__input--buttons'>
                        <button
                            onClick={onUpdate}
                            className='btn'
                        >
                            Update
                        </button>
                        <button
                            onClick={onDelete}
                            className='btn btn-delete'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </form>
        </>
    );

}

export default EditUser;