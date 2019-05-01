require('dotenv').config();
import express from 'express';
import fs from 'fs';
import graphqlHTTP from 'express-graphql';

//React, ReactRouter, Redux imports
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

//Main component import
import  App from '../client/App';

//GraphQL schema
import schema from './database/GraphQL/schema';
import { checkForToken } from './database/GraphQL/utility';

import User from './database/Models/User';
import Note from './database/Models/Note';

const app = express();
app.use(express.static('public'));
app.use(express.static('images'));
app.use('/graphql', checkForToken, graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: {
        user: req.user
    }
})));

app.get('/add', async(req, res) => {
    const newNote = new Note({
        userId: '5cbb860f4d887f4cb8110a44',
        note: 'new note',
        date: new Date(),
        title: 'Title'
    });
    res.json(await newNote.save());

});

app.get('/notess', async(req, res) => {
    res.json(await Note.find({}));
});

app.get('/users', async(req, res) => {
    res.json(await User.find({}));
});

const files = fs.readdirSync('./public');

app.listen(2000);

app.get('*', (req, res) => {
    const markup = renderToString(
        <Router location={req.url} context={{}}>
            <App/>
        </Router>
    );

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Notes</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="${files[0]}" defer></script>
            <link type="text/css" href="${files[1]}" rel="stylesheet"/>
        </head>
        <body>
            <div id="root">${markup}</div>
        </body>
        </html>
    `);
});