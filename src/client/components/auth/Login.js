import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

//Components
import LoginP from './LoginP';
import { useAppState } from '../../state/state.context';

//Queries
import { loginMutation } from '../../queries/auth';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {state, dispatch} = useAppState();
    
    if(!state.isEmpty) return <Redirect to="/notes"/>

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await props.loginMutation({
            variables: {
                email: email,
                password: password
            }
        });
        let { error, token } = data.data.loginUser;
        if(error) setError(error);
        if(token){
            dispatch({ type: 0, payload: { token } });
            props.history.push('/notes');
        }
    } 

    return <LoginP data={{email, password}} handleChange={{setEmail, setPassword}} handleSubmit={handleSubmit} error={error}/>
}

export default graphql(
    loginMutation, { name: 'loginMutation' }
)(Login);
