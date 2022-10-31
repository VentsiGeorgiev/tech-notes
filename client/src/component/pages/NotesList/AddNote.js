import { useState } from 'react';

function AddNote() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <h2 className='form__title'>Add Note</h2>
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
    );
}

export default AddNote;