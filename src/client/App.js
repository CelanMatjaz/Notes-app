import React from 'react';
import StateProvider from './state/StateProvider';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';

//Routes
import Routes from './Routes';

//Components

const App = () => {       
    return (
        <ApolloProvider client={client}>
            <StateProvider>
                <Routes/>
            </StateProvider>
        </ApolloProvider>
    );
}



export default App;