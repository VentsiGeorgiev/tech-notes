import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectNoteById } from '../../../app/services/notes';

function Note({ noteId }) {

    const note = useSelector(state => selectNoteById(state, noteId));

    if (note) {

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
                    <Link className='btn' to={`/dashboard/notes/${noteId}`}>Edit</Link>
                </td>
            </tr>
        );
    }



}

export default Note;