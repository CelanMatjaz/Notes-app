import React from 'react';

//Components
import Navbar from '../layout/Navbar';

const Notes = ({ isEmpty, history: { push } }) => {
    if(isEmpty) push('/register');
    return (
        <div>
            <Navbar/>
            <main>

            </main>
        </div>
    );
};

export default Notes;