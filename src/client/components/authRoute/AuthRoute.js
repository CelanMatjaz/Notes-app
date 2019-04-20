import React from 'react';
import { useAppState } from '../../state/state.context';
import { Redirect, Route} from 'react-router-dom';

const AuthRoute = props => {
    const { state } = useAppState();
    
    if(state.isEmpty) return <Redirect to="/login"/>

    return <Route {...props}/>
};

export default AuthRoute;