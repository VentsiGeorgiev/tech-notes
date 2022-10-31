import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '../../../app/services/auth';
import { setCredentials } from '../../../features/auth/authSlice';
import usePersist from '../../../hooks/usePersist';
import { Alert, Header, Spinner } from '../../shared';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [persist, setPersist] = usePersist();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading, isError, error }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setFormError('All fields are required');
            return;
        }

        const { accessToken } = await login({ username, password }).unwrap();

        setUsername('');
        setPassword('');
        dispatch(setCredentials({ accessToken }));
        setFormError('');
        navigate('/dashboard');


    };

    const handleToggle = () => {
        setPersist((state) => !state);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Header />
            {isError && <Alert message={error?.data?.message} msgType='error' />}
            <section className='container center'>

                <form onSubmit={handleSubmit} className='form'>
                    <h2 className='form__title'>Login</h2>
                    {formError && <p className='error'>{formError}</p>}
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
                            id='persist'
                            type='checkbox'
                            value={persist}
                            onChange={handleToggle}
                            className='form__input__persist'
                        />
                        <label
                            htmlFor='persist'
                        >Trust this device</label>
                    </div>
                    <button className='btn btn-login'>Sign In</button>
                </form>
            </section>
        </>
    );
}

export default Login;