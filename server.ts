import { Request,Response} from 'express';
import utilsRoute from './routes/utils';

const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const viewsPath = './views/';

server.use(express.static(path.join(__dirname,'views')));  //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));

server.use('/utils',utilsRoute);

server.get('/', (req:Request, res: Response) => {
    fs.readFile(viewsPath+'index.html', 'utf-8', (err,content) => {
        if(err){
            res.send('server is out');
        }
        res.send(content);
    });
});

server.get('/login', (req:Request, res:Response) => {
    fs.readFile(viewsPath+'login.html', 'utf-8', (err,content) => {
        if(err){
            res.send('cannot acess login page');
        }
        res.send(content);
    });
});


server.listen(process.env.PORT, console.log("server is up on http://localhost:"+process.env.PORT));