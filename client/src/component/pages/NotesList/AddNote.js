import { useEffect, useState } from 'react';
import { useAddNewNoteMutation } from '../../../app/services/notes';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from '../../shared';
import useAuth from '../../../hooks/useAuth';


function AddNote() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [formError, setFormError] = useState('');

    const [addNewNote, { isLoading, isSuccess, isError, error }] = useAddNewNoteMutation();

    const { userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (isSuccess) {
            setTitle('');
            setText('');
            navigate('/dashboard/notes');
        }

    }, [isSuccess, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '' || text.trim() === '') {
            setFormError('All fields are required');
            return;
        }
        addNewNote({ user: userId, title, text });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {isError && <Alert message={error?.data?.message} />}
            <form onSubmit={handleSubmit} className='form'>
                <h2 className='form__title'>Add Note</h2>
                {formError && <p className='error'>{formError}</p>}
                <div className='form__input'>
                    <label
                        htmlFor='title'
                        className='form__input__label'
                    >
                        Title
                    </label>
                    <input
                        id='title'
                        type='text'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='form__input__field'
                    />
                </div>
                <div className='form__input'>
                    <label
                        htmlFor='text'
                        className='form__input__label'
                    >
                        Description
                    </label>
                    <textarea
                        id='text'
                        type='text'
                        name='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='form__input__field'
                    />
                </div>

                <button className='btn'>Add Note</button>
            </form>
        </>
    );
}

export default AddNote;