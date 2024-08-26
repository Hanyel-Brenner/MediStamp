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
    let abiJson = process.env.CONTRACT_ABI;
    let abi = JSON.parse(abiJson as string);
    console.log(abi);
    res.json({abi});
});

server.get('/getContractAddress', (req:Request, res:Response) => {
    let address = process.env.CONTRACT_ADDRESS;
    res.json({address});
});

server.post('/findRequest', async (req : Request,res : Response) => {
    const userAddr = req.body.userAddress;
    const docAddr = req.body.doctorAddress;
    const hospAddr = req.body.hospitalAddress;
    const desc = req.body.description;
    const sender = req.body.sender;
    /*let result = await contract.methods.findRequest(userAddr, docAddr, hospAddr, desc)
    .send({from : sender});

    if(result) {
        console.log(result);
        res.send();
    }
    else res.send('ERROR : could not find request'); */
    console.log(sender);
    res.send();
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