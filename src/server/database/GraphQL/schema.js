import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLString,
} from 'graphql';

import { registerCheck, loginCheck } from './utility';

import User from '../Models/User';
import Note from '../Models/Note';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const NoteType = new GraphQLObjectType({
    name: 'Note',
    fields: () => ({
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        note: { type: GraphQLString },
        date: { type: GraphQLString },
        dateEdited: { type: GraphQLString },
        id: { type: GraphQLID }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        id: { type: GraphQLID }
    })
});


const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        errors: { type: GraphQLList(GraphQLString) },
        msg: { type: GraphQLString },
        token: { type: GraphQLString }
    })
});

//Root query
const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        User: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                return await User.findById(args.id);
            }
        },
        Note: {
            type: NoteType,
            args: { userId: { type: GraphQLID } },
            resolve: async (parent, args, context) => {
                if(!context.user) return null;
                return await Note.findOne({ userId: id });
            }
        },
        Notes: {
            type: new GraphQLList(NoteType),
            resolve: async (parent, args, context) => {
                return await Note.find({ userId: context.user.id });
            }
        }
    }
});

//Mutations
const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: ResponseType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                passwordRepeat: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const { errors, newUser } = registerCheck(args);
                if(errors) return { errors };
                newUser.password = bcrypt.hashSync(args.password, 8);
                const user = new User(newUser);
                try{
                    await user.save();
                    return { msg: 'New user registered' };
                }
                catch(e){
                    return { errors: ['User with that email already exists'] }
                }
                
            }
        },
        loginUser: {
            type: ResponseType,
            args: {
                email: { type:  GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const { errors } = loginCheck(args);
                if(errors) return { errors };
                const { email, password } = args;
                const foundUser = await User.findOne({ email });
                if(foundUser && bcrypt.compareSync(password,foundUser.password)){
                    const token = await jwt.sign({ data: {
                        id: foundUser._id,
                        email: foundUser.email,
                        name: foundUser.name
                    } }, process.env.SECRET, { expiresIn: '1y' });
                    return {
                        token
                    }
                }
                return {
                    errors: ['User with that email does not exist']
                }
            }
        },
        addNote: {
            type: ResponseType,
            args: { note: { type: GraphQLString }, title: { type: GraphQLString } },
            resolve: async (parent, { note, title }, context) => {
                if(!context.user) return { errors: ['Not authorized'] };
                const user = User.findOne({ id: context.user.id });
                if(!user) return { errors: ['Not authorized'] };
                const newNote = new Note({
                    userId: context.user.id,
                    title,
                    note,
                    date: new Date()
                });
                try{
                    await newNote.save();
                    return { msg: 'New note added' };
                }
                catch(e){
                    console.log(e);
                    return { errors: ['Error with inserting into database'] };
                }
            }
        },
        editNote: {
            type: NoteType,
            args: {
                note: { type: GraphQLString },
                noteId: { type: GraphQLID }
            },
            resolve: async (parent, { note, noteId }, { user: { id } }) => {
                const user = await User.findOne({ id });
                if(!user) 
                    return {
                        errors: ['Auth error']
                    };                 
                try{
                    return await Note.findOneAndUpdate({ _id: noteId }, { note, dateEdited: new Date() });
                }
                catch(e){
                    return {
                        errors: ['Error updating note']
                    }; 
                }
            }
        },
        deleteNote: {
            type: ResponseType,
            args: { noteId: { type: GraphQLID } },
            resolve: async (parent, { noteId }, { user: { id } }) => {
                const user = await User.findOne({ id });
                if(!user) return {
                    errors: ['Auth error']
                };                
                try{
                    return await Note.findOneAndDelete({ _id: noteId });
                }
                catch(e){
                    return {
                        errors: ['Error deleting note']
                    };      
                }
            }
        }
    }
});

export default new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});