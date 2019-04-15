import { Route, Switch } from 'react-router-dom'; 

import React from 'react';

//Components
import Notes from './components/notes/Notes';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const Routes = props => {
    return (
        <Switch>
            <Route exact path="/" component={Notes}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
        </Switch>
    );
};

export default Routes;