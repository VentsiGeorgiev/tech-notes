import { useEffect, useState } from 'react';
import { useAddNewUserMutation } from '../../../app/services/users';
import { ROLES } from '../../../utils/roles';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from '../../shared';

function AddUser() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState(['Employee']);
    const [formError, setFormError] = useState('');

    const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();

    const navigate = useNavigate();

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        );
    });
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRoles(values);
    };

    useEffect(() => {
        if (isSuccess) {
            setUsername('');
            setPassword('');
            setRoles([]);
            navigate('/dashboard/users');
        }
    }, [isSuccess, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setFormError('All fields are required');
            return;
        }
        addNewUser({ username, password, roles });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {isError && <Alert message={error?.data?.message} />}
            {formError && <p className='error'>{formError}</p>}
            <form onSubmit={handleSubmit} className='form'>
                <h2 className='form__title'>Create User</h2>
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
                    <button className='btn'>Create New User</button>
                </div>
            </form>
        </>
    );
}

export default AddUser;