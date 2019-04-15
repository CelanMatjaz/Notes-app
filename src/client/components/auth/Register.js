import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import RegisterP from './RegisterP';

const Register = props => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const handleSubmit = async event => {
        event.preventDefault();
        const data = await props.registerMutation({
            variables: {
                email,
                password,
                passwordRepeat
            }
        });
        let { error, message } = data.data.register;
        setError(error);
        setMessage(message);
    }
    
    //if(!props.isEmpty) return <Redirect to="/"/>;	

    return <RegisterP 
        data={{email, password, passwordRepeat, name}} 
        handleChange={{ setEmail, setPassword, setPasswordRepeat, setName }} 
        handleSubmit={handleSubmit}
        error={error}
        message={message}
    />
}

export default Register;
