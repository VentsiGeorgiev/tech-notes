import { useSelector } from 'react-redux';
import { selectNoteById } from '../../../app/services/notes';

function Note({ noteId }) {

    const note = useSelector(state => selectNoteById(state, noteId));

    if (note) {
        console.log('note --');
        console.log(note);

        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });

        return (
            <tr>
                <td>
                    {note.completed
                        ? <span>Completed</span>
                        : <span>Open</span>
                    }
                </td>
                <td>{created}</td>
                <td>{updated}</td>
                <td>{note.title}</td>
                <td>{note.user.username}</td>

                <td >
                    <button className='btn'>Edit</button>
                </td>
            </tr>
        );
    }



}

export default Note;