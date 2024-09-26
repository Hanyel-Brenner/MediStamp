import { Post } from "../models/post"
import { User } from "../models/user"
import {Comment} from "../models/comment"

export interface IApp{
    registerUser(user:User):Promise<string>  //will return id most likely
    registerPost(post:Post):Promise<string> //will return id most likely
    registerComment(comment:Comment):Promise<string> //will return id of added comments
    listUsers():Promise<User[]>
    listPosts():Promise<Post[]>

   // unregisterUser()
   // unregisterPost()
    //authenticateUser()

}