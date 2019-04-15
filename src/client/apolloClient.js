import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});