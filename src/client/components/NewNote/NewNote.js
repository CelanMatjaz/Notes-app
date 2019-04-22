import React, { useState } from 'react';

const NewNote = props => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h1>New note</h1>
                <label htmlFor="title">Title</label> <br/>
                <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required/> <br/>

                <label htmlFor="note">Note</label> <br/>
                <textarea id="note" value={note} onChange={e => setNote(e.target.value)} required /> <br/>
                <button>Add note</button>
                <br/> 
            </form>
        </div>
    );
};

export default NewNote;