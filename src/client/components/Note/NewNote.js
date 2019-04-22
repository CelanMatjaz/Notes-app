import React from 'react';
import { Link } from 'react-router-dom';

const NewNote = props => {
    return (
        <Link to="/new-note" className="note new-note">New note</Link>
    );
};

export default NewNote;