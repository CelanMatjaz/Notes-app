import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; 
import AuthRoute from './components/authRoute/AuthRoute';

//Components
import Notes from './components/notes/Notes';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NewNote from './components/NewNote/NewNote';

const Routes = () => {
    return (
        <Switch>
            <AuthRoute exact path="/notes" component={Notes}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/new-note" component={NewNote}/>
            <Route path="*" component={() => <Redirect to="/login"/>}/>
        </Switch>
    );
};

export default Routes;