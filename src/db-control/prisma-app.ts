import { IApp } from "../interfaces/i-App";
import { Post } from "../models/post";
import { User } from "../models/user";
import { Comment} from "../models/comment"
import { PrismaPostRepo } from "./prisma-post-repo";
import { PrismaUserRepo } from "./prisma-user-repo";
import { PrismaCommentRepo } from "./prisma-comment-repo";
import { PrismaCookieRepo } from "./prisma-cookie-repo";
import { Cookie } from "../models/cookie";

export class PrismaApp implements IApp{

    public users = new PrismaUserRepo();
    public posts = new PrismaPostRepo();
    public comments = new PrismaCommentRepo();
    public cookies = new PrismaCookieRepo();

    async authenticateUser(email:string,password:string):Promise<boolean>
    {
        let user = await this.users.find(email)
        if(!user) return false;
        if(user.password != password) return false;
        if(user.password == password) return true;
    }
    
    async registerUser(user: User): Promise<string> 
    {
        let addedUser = await this.users.add(user)
        return addedUser    
    }
    
    async registerPost(post: Post): Promise<string> 
    {
        let addedPost = await this.posts.add(post)
        return addedPost   
    }

    async registerComment(comment:Comment):Promise<string>
    {
        let addedComment = await this.comments.add(comment)
        return addedComment
    }

    async listUsers():Promise<User[]>
    {
        return this.users.list();
    }

    async listPosts(): Promise<Post[]> 
    {
        return this.posts.list();    
    }

    async createCookie(email : string , sessionId : string) : Promise<string>{
        const cookie = new Cookie(email,sessionId);
        await this.cookies.add(cookie);
        return cookie.sessionId;
    }

    async verifyCookie(cookieId : string) : Promise<boolean>{
        return await this.cookies.verify(cookieId);
    }

    async getCookie(cookieId : string) : Promise<Cookie>{
        return await this.cookies.find(cookieId);
    }

}



export default new PrismaApp();