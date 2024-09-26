import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { User } from '../models/user'
import { PrismaApp } from './prisma-app';
//import prisma from './db'
const prisma = new PrismaApp(); 
//create user and then create post with that user as  author.
async function userAndPost(){
    let addedUserId = await prisma.registerUser(new User('hanyel','hanyel@mail','123'));
    console.log('Added user ID :'+ addedUserId);
    console.log(await prisma.users.find('hanyel@mail'))
    console.log((await prisma.users.find('hanyel@mail')).id)
    
    let userToAdd = await prisma.users.find('hanyel@mail');
    let addedPostId = await prisma.registerPost(new Post('Why I like coding in C','C is better than javascript',userToAdd))
    console.log('Added post ID : '+addedPostId);
    console.log(await prisma.posts.find(addedPostId))


    //create user with same email to see if duplicates are possible (they should'nt)
    await prisma.registerUser(new User('daniel','hanyel@mail','312'));
    await prisma.registerUser(new User('daniel','daniel@mail','1432'));

//allegedly creates a comment and then appends it to a post.
    let foundUser = await prisma.users.find('hanyel@mail');
    let foundPost = await prisma.posts.find(addedPostId)  //the found post is taken from the previous function
    let addedCommentId= await prisma.registerComment(new Comment('ok but what even is ===', foundUser,foundPost ));
    console.log('added comment ID : '+addedCommentId);
    let foundComment = await prisma.comments.find(addedCommentId);
    console.log(foundComment);

   /* console.log('is author of added post correct?')
    if(addedUserId == foundPost.author.id) console.log(1 == 1)
    else console.log(1 != 1);
    console.log('is author of added comment correct?');
    if(addedUserId == foundComment.author.id) console.log(1==1)
    else console.log(1!=1)
    console.log('is referenced post of added comment correct?')
    if(addedPostId == foundComment.post.id) console.log(1==1)
    else console.log(1!=1)
    */
}

userAndPost();
