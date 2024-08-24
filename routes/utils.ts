import { Request,Response} from 'express';
import {web3,contract} from '../src/setup/web3';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const viewsPath = './views/';
const bodyParser = require('body-parser');
const crypto = require('crypto');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

router.get('/generateNonce', (req:Request, res:Response) => {
    const nonce = crypto.randomBytes(32).toString('hex');
    res.json({nonce});
});

router.get('/verifyProvider', (req:Request, res:Response) => {
    fs.readFile(viewsPath+'verifyProvider.html', 'utf-8', (err: any,content: any) => {
        if(err){
            res.send('cannot acess page');
        }
        res.send(content);
    });
});

router.get('/getUserInformation/:address', async (req:Request, res:Response) => {
    let user = await contract.methods.getUserInformation(req.params.address)
    .call({from : req.params.address}) 
    console.log(user);
    res.send('user is :'+{user}.toString());
})

export default router;

