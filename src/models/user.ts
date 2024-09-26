import { Post } from "./post";

export class User{

    public id:string='';
    public nickname:string='';
    public email:string='';
    public password:string='';
    //public post:Post[];

    constructor(nickname:string,email:string, password:string)
    {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }
}