import { Request,Response} from 'express';
import {web3,contract} from '../src/setup/web3';

require('dotenv').config();
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
    .call({from : process.env.MY_WALLET}) 
    console.log(user);
    res.send();
})

router.get('/getDoctorInformation/:address', async (req:Request,res:Response) => {
    let doctor = await contract.methods.getDoctorInformation(req.params.address)
    .call({from : process.env.MY_WALLET});
    console.log(doctor);
    res.send();
});

router.get('/getHospitalInformation/:address', async (req:Request,res:Response) => {
    let hospital = await contract.methods.getEntityInformation(req.params.address)
    .call({from : process.env.MY_WALLET});
    console.log(hospital);
    res.send();
});

router.get('/getRequestsToDoctor/:address', async (req:Request,res:Response) => {
    let requests = await contract.methods.findRequest(req.params.address)
    .call({from : req.params.address});
    console.log(requests);
    res.send();
});

router.get('/getCertificates', async (req:Request,res:Response) => {
    let requests = await contract.methods.getCertificate(req.params.address)
    .call({from : req.params.address});
    console.log(requests);
    res.send();
});

router.get('/verifyRole/:role/:address', async (req:Request, res:Response) => {
    let result = await contract.methods.returnRole(req.params.role,req.params.address)
    .call({from : process.env.MY_WALLET})
    console.log(result);
});

export default router;

