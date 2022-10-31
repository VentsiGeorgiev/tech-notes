import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectNoteById, useDeleteNoteMutation, useUpdateNoteMutation } from '../../../app/services/notes';
import { Alert, Spinner } from '../../shared';
import useAuth from '../../../hooks/useAuth';

function EditNote() {
    const { id } = useParams();
    const { userId } = useAuth();
    const note = useSelector(state => selectNoteById(state, id));

    const [updateNote, { isLoading, isSuccess, isError, error }] = useUpdateNoteMutation();
    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        isLoading: isDelLoading,
        error: delError
    }] = useDeleteNoteMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState(note?.title);
    const [text, setText] = useState(note?.text);
    const [completed, setCompleted] = useState(note?.completed);
    const [formError, setFormError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === '' || text.trim() === '') {
            setFormError('All fields are required');
            return;
        }
    };

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('');
            setText('');
            navigate('/dashboard/notes');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onUpdate = () => {
        updateNote({ id, user: userId, title, text, completed });
    };
    const onDelete = () => {
        deleteNote({ id });
    };

    if (isLoading || isDelLoading) {
        return <Spinner />;
    }

    return (
        <>
            {isError && <Alert message={error?.data?.message} />}
            {isDelError && <Alert message={delError?.data?.message} />}
            <form onSubmit={handleSubmit} className='form'>
                <h2 className='form__title'>Update Note</h2>
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
                <div className='form__input'>
                    <input
                        id='user-active'
                        type='checkbox'
                        name='user-active'
                        checked={completed}
                        onChange={() => setCompleted((prevState) => !prevState)}
                        className='form__input__persist'
                    />
                    <label
                        htmlFor='persist'
                    >
                        Completed
                    </label>
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

export default EditNote;