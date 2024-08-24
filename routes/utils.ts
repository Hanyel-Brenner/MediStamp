import { Request,Response} from 'express';

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

export default router;

