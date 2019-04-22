import gql from 'graphql-tag';

export const notesQuery = gql`
    query{
        Notes{
            id
            title
            note
            date
            dateEdited
        }
    }
`;