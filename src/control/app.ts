import { PostRepo } from "./posts-repo";
import { UserRepo } from "./user-repo";
import { Post } from "../models/post";
import { User } from "../models/user";
import { UserAlreadyRegistered } from "../erros/user-already-registered";
import { EmptyPost } from "../erros/empty-post";
import { IApp } from "../interfaces/i-App";
import { CommentRepo } from "./comment-repo";
import { Comment } from "../models/comment";
import { EmptyComment } from "../erros/empty-comment";

export class App implements IApp{  //we will leave one instance of this class to represent the "database" containing all posts and users
    
public postRepo:PostRepo;
public userRepo:UserRepo;
public commentRepo:CommentRepo;

    constructor(user:UserRepo,post:PostRepo,comment:CommentRepo)
    {
        this.postRepo = post;
        this.userRepo = user;
        this.commentRepo = comment;
    }

    async registerUser(user:User):Promise<string>
    {
        if(await this.userRepo.find(user.email)){
            throw new UserAlreadyRegistered()
        }
        return await this.userRepo.add(user);
        /*let valid = await this.userRepo.find(user.email)
        if(!valid) {return await this.userRepo.add(user)} //if added sucessfully, returns id of added user.
        else throw new UserAlreadyRegistered()*/
    }

    async registerPost(post:Post):Promise<string>
    {
        if(post.content == '') throw new EmptyPost();
        else return await this.postRepo.add(post);
    }

    async registerComment(comment:Comment):Promise<string>
    {
        if(comment.content == '') throw new EmptyComment();
        else return await this.commentRepo.add(comment);
    }

     async listUsers():Promise<User[]>
    {
        return await this.userRepo.list();
    }
    async listPosts(): Promise<Post[]> 
    {
        return await this.postRepo.list();
    }
    async listComments():Promise<Comment[]>
    {
        return await this.commentRepo.list();
    }
}
let app:App = new App(new UserRepo(),new PostRepo(),new CommentRepo()); 

/*
(async () => {
    await app.registerUser(new User('redfield','redfield@mail.com','123'));
await app.registerUser(new User('hanyel','hanyel@mail.com','123'));
await app.registerUser(new User('daniel','daniel@mail.com','123'));
await app.registerUser(new User('pedro','pedro@mail.com','123'));
await app.registerUser(new User('corno','corno@hotmail.com','123'));
    })();


(async () => {
await app.registerPost('sharks','sharks are very interesting creatures', 'hanyel@mail.com');
await app.registerPost('dark souls 1 vs 2','dark souls 1 is way better of course', 'corno@hotmail.com');
await app.registerPost('????','noideia','daniel@mail.com');
})();

(async () => {
let post = await app.postRepo.find('sharks','hanyel@mail.com')
await app.registerComment(new Comment('I think sharks are stupid','corno@hotmail.com',post.id))
})();

//the following is test to see if we can find the registered user if we use the UserRepo.find() method
*/
//export {app};