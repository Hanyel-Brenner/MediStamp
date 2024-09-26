import { Comment } from "../models/comment"

export interface ICommentRepo
{
    find(commentId:string):Promise<Comment>
    add(comment:Comment):Promise<string> //should return the id of the added comment
    remove(commentId:string):Promise<void>
    list(postId:string):Promise<Comment[]> //this will be to list all comments of a single post, therefore, the post id should be given
}