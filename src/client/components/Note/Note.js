import React from 'react';
import { Link } from 'react-router-dom';

const Note = ({ note: { title, note, date, dateEdited, id } }) => {
    return (
        <Link to={`/note/${id}`} className="note">
            <h3>{title}</h3>
            <p>{note}</p>
            <small>{dateEdited ? dateEdited : date}</small>
        </Link> 
    );
};

export default Note;