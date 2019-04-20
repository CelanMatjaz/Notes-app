import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

import RegisterP from './RegisterP';

//Mutations
import { registerMutation } from '../../queries/auth';

const Register = props => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState(null);
    
    const handleSubmit = async event => {
        event.preventDefault();
        const data = await props.registerMutation({
            variables: {
                email,
                name,
                password,
                passwordRepeat
            }
        });
        let { errors, msg } = data.data.registerUser;
        setErrors(errors);
        setMessage(msg);
    }

    return <RegisterP 
        data={{email, password, passwordRepeat, name}} 
        handleChange={{ setEmail, setPassword, setPasswordRepeat, setName }} 
        handleSubmit={handleSubmit}
        errors={errors}
        message={message}
    />
}

export default graphql(
    registerMutation, { name: 'registerMutation' }
)(Register);
