import { Link } from 'react-router-dom';
import { useGetNotesQuery } from '../../../app/services/notes';
import { Alert, Spinner } from '../../shared';
import Note from './Note';

function NotesList() {

    const { data: notes, isLoading, isSuccess, isError, error } = useGetNotesQuery();


    if (isLoading) {
        return <Spinner />;
    }

    let content;
    if (isSuccess) {
        const { ids } = notes;

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null;

        content = (
            <section>
                {isError && <Alert message={error?.data?.message} />}
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Title</th>
                            <th>Owner</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </section>
        );
    }

    return content;

}

export default NotesList;