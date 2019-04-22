import React from 'react';

//Components
import Navbar from '../layout/Navbar';
import NoteList from '../NoteList/NoteList';

const Notes = ({ isEmpty, history: { push } }) => {
    if(isEmpty) push('/register');
    return (
        <div>
            <Navbar/>
            <main>
                <NoteList/>
            </main>
        </div>
    );
};

export default Notes;