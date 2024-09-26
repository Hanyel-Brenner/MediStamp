import { User } from "./user";

export class Post
{

    public id:string = '';
    public title:string = '';
    public content:string = '';
    public author:User;
    public date: Date;
    
    constructor(title:string,content:string,author:User)
    {
        this.title = title;
        this.content = content;
        this.author = author;
        this.date = new Date();
    }

}