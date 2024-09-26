import { Request,Response} from 'express';
import { UserRepo } from './src/control/user-repo';
import { PostRepo } from './src/control/posts-repo';
import { User } from './src/models/user';
import { Post } from './src/models/post';
import app from "./src/db-control/prisma-app";
//routes
import mainRoute from "./routes/main";
import apiRoute from "./routes/api";

const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const PORT = 3000;
const baseUrl = 'http://localhost:'+PORT.toString();
const viewsPath = './db-views/';
const bodyParser = require('body-parser');
//const session = require('express-session');
require('dotenv').config();

//routes
server.use('/', mainRoute);
server.use('/api', apiRoute);

server.use(express.static(path.join(__dirname,'db-views')));  //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));

/*server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))*/

server.get('/users', (req:Request,res:Response) => {

    fs.readFile(viewsPath+'users.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
})

server.get('/comments',(req:Request,res:Response) => {

    fs.readFile(viewsPath+'comments.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    })
})

server.listen(PORT, console.log('Server is up and listening on PORT '+PORT.toString()+'. You can check it up on '+baseUrl))