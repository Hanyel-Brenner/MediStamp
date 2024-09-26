import { NextFunction, Request,Response} from 'express';
import app from "../src/db-control/prisma-app";
import { User } from '../src/models/user';
import { Cookie } from '../src/models/cookie';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const viewsPath = './db-views/';
const bodyParser = require('body-parser');
require('dotenv').config();

router.use(bodyParser.json());
router.use(express.json());
router.use(bodyParser.urlencoded({extended : false}));

const session = require('express-session');
//router.set('trust proxy', 1) // trust first proxy
router.use(session({
  genid: function(req) {
    return crypto.randomUUID() // use UUIDs for session IDs
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false , expires : 18000}
}))

/*async function verifySession(req, res, next){
    //1.session already exists, so we should verify if the sessionID belongs to an email on the database.
    //2.if so, just set authSucess = true in the request body and go to next.
    //3.if not, set authSucess = false in the request body, so the user will need to insert ther credentials to login and set the sessionID on the database. 
    if(req.session.userEmail){
        const cookie:Cookie = await app.getCookie(req.sessionID);
        if(!cookie) {
            req.body.authSucess = false;
            next();
        }
        req.body.authSucess = true;
        next();
    }
    req.body.authSucess = false;
    next();
}*/

router.get('/endCookie', async(req,res) => {
    console.log("session before ending cookie : "+req.session);
    res.session = null;
    console.log("session after ending cookie : ", req.session);
    res.send();
})

router.get('/getCookie', async (req,res) => {
    let cookie = await app.getCookie(req.sessionID);
    if(cookie){
        res.send(cookie);
    }
    res.send();
})

router.get('/', (request:Request,response:Response) => {
    fs.readFile(viewsPath+'index.html', 'utf-8', (err,html) => {
        if(err != null){
            response.status(500).send('Sorry, the server is out of order!');
        }
        response.send(html);
    })
});

router.get('/home', (req:Request,res:Response) => {

    fs.readFile(viewsPath+'home.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
})

router.get('/register', (req:Request,res:Response) => {

    fs.readFile(viewsPath+'register.html','utf-8', (err,content) => {
        if(err != null){
            res.status(500).send('Sorry, the server is out of  order!');
        }
        res.send(content)
    });

})

router.post('/register', async(req:Request,res:Response) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    await app.registerUser(new User(username,email,password));
    
    res.send("<h1> username :"+ username +"<h1/>"+"<h1> email : "+email+"<h1/>"+"<h1> password : "+password +"<h1/>");
});

router.get('/login', async (req,res) => {
        fs.readFile(viewsPath+'login.html','utf-8', (err,content) => {
            if(err != null){
                res.status(500).send('Sorry, the server is out of order!');
            }
                res.send(content);
        });
});

router.post('/login', async (req,res) => {

    let email = req.body.email;
    let password = req.body.password;

    let authenticated:boolean = await app.authenticateUser(email,password);

    if(authenticated == false) {
        res.status(403).send('<p>login falhou</p>');
    }
    else{
        await app.createCookie(email,req.sessionID);
        req.session.userEmail = (await app.getCookie(req.sessionID)).email;
        res.status(200).send('<p>usuario logou e cookie foi criado e mandado para o banco de dados</p>');
    }
});

router.get('/about', (req:Request,res:Response) => {
    fs.readFile(viewsPath+'about.html','utf-8', (err,content) =>{
        if(err != null){
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    })
})

router.get('/policy', (req:Request,res:Response) => {
    fs.readFile(viewsPath+'policy.html','utf-8', (err,content) =>{
        if(err != null){
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    })
})

export default router;

