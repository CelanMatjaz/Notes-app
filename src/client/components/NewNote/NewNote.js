import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

//Components
import Message from '../layout/Message';

//Queries
import { addNote } from '../../queries/notes';

const NewNote = props => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [errors, setErrors] = useState([]);

    return (
        <div className="form">
            <Mutation mutation={addNote}>
                {(add, { data, loading, error }) => {
                    if(data){
                        const { msg, errors } = data.addNote
                        if(msg) props.history.goBack();
                        if(errors) setErrors(errors);
                    }
                    return (
                        <form 
                            onSubmit={
                                e => {
                                    e.preventDefault();
                                    add({ variables: { title, note } });
                                }
                            }
                        >
                            <h1>New note</h1> 
                            {error && <Message type="danger" message={error}/>}
                            {errors.length > 0 && errors.map((error, i) => <Message type="danger" message={error} key={i}/>)}
                            <label htmlFor="title">Title</label> <br/>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required/> <br/>
                            
                            <label htmlFor="note">Note</label> <br/>
                            <textarea id="note" value={note} onChange={e => setNote(e.target.value)} required /> <br/>
                            <button>Add note</button>
                            <br/> 
                        </form>
                    )
                }}
            </Mutation>
        </div>
    );
};

export default NewNote;