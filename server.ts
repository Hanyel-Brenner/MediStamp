import { NextFunction, Request,Response} from 'express';
import utilsRoute from './routes/utils';
import {web3,contract} from './src/setup/web3';

const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const viewsPath = './views/';

server.use(express.static(path.join(__dirname,'views')));  //this line tells the server that it can use all the front end files that are on the 'views' directory (css,html,javascript files)
server.use(express.static(path.join(__dirname,'src')));  //this line tells the server that there is javascript 

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));

server.use('/utils',utilsRoute);

server.get('/', (req:Request, res: Response) => {
    fs.readFile(viewsPath+'index.html', 'utf-8', (err: any,content: any) => {
        if(err){
            res.send('server is out');
        }
        res.send(content);
    });
});

server.get('/getContractAbi', (req:Request, res:Response) => {
    let abi = process.env.CONTRACT_ABI;
    res.send(abi);
});

server.get('/getContractAddress', (req:Request, res:Response) => {
    let address = process.env.CONTRACT_ADDRESS;
    res.json({address});
});

server.post('/registerPatient', async (req:Request, res:Response) => {
    const name = req.body.userName;
    const cpf = req.body.cpf;
    const email = req.body.email;

    //now we call registerUser from smart contract with the provided arguments
    await contract.methods.registerUser(process.env.MY_WALLET, cpf, email)
    .send({from : process.env.MY_WALLET});

    const userAdded = await contract.methods.getUserInformation(process.env.MY_WALLET)
    .call({from : process.env.MY_WALLET});

    res.send({userAdded});
});

server.post('/registerDoctor', (req:Request, res:Response) => {
    const doctorName = req.body.doctorName;
    const uf = req.body.uf;
    const crm = req.body.crm;
    const hospitalAddress = req.body.hospitalAddress;

    res.send(doctorName+uf+crm+hospitalAddress);
});

server.post('/registerEntity', (req:Request, res:Response) => {
    const hospitalName = req.body.hospitalName;

    res.send(hospitalName);
});

/*async function auth(req:Request, res:Response, next:NextFunction){
    console.log(req.body);
    const signature = req.body.signature;
    const message = req.body.nonce;
    const address = req.body.addr; 

    const recoveredAddress = await web3.eth.accounts.recover(message,signature);

    console.log('recovered address : '+recoveredAddress);

    if(recoveredAddress.toLowerCase() == address.toLowerCase()){ //means the authentication went correctly and jwt must be generated
        let token = jwt.sign({address}, process.env.SECRET, {expiresIn : 3000});
        console.log("json web token : "+token);
        next();
    }
    else {
        console.log('authentication failed');   
        alert('Failed to authenticate');
        res.redirect('http://localhost:3000'); //authentication failed and user was returned to index page;
    }
}*/

/*server.get('/login', (req:Request, res:Response) => {
    fs.readFile(viewsPath+'login.html', 'utf-8', (err: any,content: any) => {
        if(err){
            res.send('cannot acess login page');
        }
        res.send(content);
    });
});*/

server.listen(process.env.PORT, console.log("server is up on http://localhost:"+process.env.PORT));