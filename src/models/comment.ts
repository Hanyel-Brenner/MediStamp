import { Post } from "./post";
import { User } from "./user";

export class Comment{

    public id:string = ''
    public content:string = ''
    public author: User //email of the author
    public post: Post
    public date:Date

    constructor(content:string,author:User,post:Post)
    {
        this.content = content;
        this.author = author;
        this.post = post;
        this.date = new Date();
    }
}