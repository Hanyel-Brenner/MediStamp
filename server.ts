import { Request,Response} from 'express';


const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
require('dotenv').config();

server.use(express.static(path.join(__dirname,'db-views')));  //this line tells the server that it can use all the static files that are on the 'views' directory (css,html,javascript files)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));

server.listen(process.env.PORT, console.log("server is up on http://localhost:"+process.env.PORT));