import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '../../../app/services/auth';
import { setCredentials } from '../../../features/auth/authSlice';
import { Header } from '../../shared';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const { accessToken } = await login({ username, password }).unwrap();
            console.log('accessToken');
            console.log(accessToken);
            dispatch(setCredentials({ accessToken }));
            navigate('/dashboard');

        } catch (error) {
            console.log('error');
            console.log(error);
        }

    };

    return (
        <>
            <Header />
            <section className='container center'>
                <form onSubmit={handleSubmit} className='form'>
                    <h2 className='form__title'>Login</h2>
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
                    <button className='btn btn-login'>Submit</button>
                </form>
            </section>
        </>
    );
}

export default Login;