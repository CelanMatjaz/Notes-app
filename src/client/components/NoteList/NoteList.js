import React from 'react';
import { graphql } from 'react-apollo';

//Components
import Note from '../Note/Note';
import NewNote from '../Note/NewNote';

//Queries
import { notesQuery } from '../../queries/notes';

const NoteList = props => {
    const { notesQuery: { Notes, error, loading } } = props;
    console.log(props);
    const notes = Notes ? Notes.map(note => <Note key={note.id} note={note}/>) : [];
    return (
        <div className="note-list">
            {notes}
            <NewNote/>
        </div>
    );
};

export default graphql(
    notesQuery, { name: 'notesQuery' }
)(NoteList);