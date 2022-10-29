import { Header } from '../../shared';
import styles from './Login.module.scss';

function Login() {
    return (
        <>
            <Header />
            <section className='container center'>
                <form className='form'>
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