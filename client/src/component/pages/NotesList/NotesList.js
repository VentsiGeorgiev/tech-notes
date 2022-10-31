import { useGetNotesQuery } from '../../../app/services/notes';

function NotesList() {

    const { data: notes } = useGetNotesQuery();

    console.log(notes);

    return (
        <div>NotesList</div>
    );
}

export default NotesList;