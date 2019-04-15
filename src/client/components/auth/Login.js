import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

//Components
import LoginP from './LoginP';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await props.loginMutation({
            variables: {
                email: email,
                password: password
            }
        });
        let { error, token } = data.data.login;
        if(error) setError(error);
        if(token){
            props.login(token);
            props.history.push('/');
        }
    }
    												
    //if(!props.isEmpty) return <Redirect to={'/'}/>;    

    return <LoginP data={{email, password}} handleChange={{setEmail, setPassword}} handleSubmit={handleSubmit} error={error}/>
}

export default Login;
