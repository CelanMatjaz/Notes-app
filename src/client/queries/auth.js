import gql from 'graphql-tag';

export const registerMutation = gql`
    mutation($email: String!, $name: String!, $password: String!, $passwordRepeat: String!){  
        registerUser(email: $email, name: $name, password: $password, passwordRepeat: $passwordRepeat){
            errors
            msg
            token
        }
    }
`;

export const loginMutation = gql`
    mutation($email: String!, $password: String!){  
        loginUser(email: $email, password: $password){
            errors
            msg
            token
        }
    }
`;