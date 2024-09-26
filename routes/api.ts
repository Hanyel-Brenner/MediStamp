import { Request,Response} from 'express';
import app from "../src/db-control/prisma-app";

const express = require('express');
const router = express.Router();
const fs = require('fs');
const viewsPath = './db-views/';
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

router.get('/getUsers', async (req:Request,res:Response) => {
    
    let usersList = await app.listUsers();
    res.send(usersList);
     
 });
 
 router.get('/getPosts', async (req:Request,res:Response) => {
 
     let postsList = await app.listPosts();
     res.send(postsList);
 
 });
 
 //it gets all the comments from a given post id and then returns the array
 router.get('/getComments/:postId', async (req:Request,res:Response) => {
 
     let commentList = await app.comments.list(req.params.postId);
     res.send(commentList);
 
 });

 export default router;