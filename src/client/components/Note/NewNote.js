import React from 'react';
import { Link } from 'react-router-dom';

const NewNote = props => {
    return (
        <Link to="/new-note" className="note new-note"><b>+</b></Link>
    );
};

export default NewNote;