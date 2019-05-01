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

export const addNote = gql`
    mutation addNote($title: String!, $note: String!){
        addNote(title: $title, note: $note){
            msg
            errors
        }
    }
`;