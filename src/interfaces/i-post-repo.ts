import { Post } from "../models/post"

export interface IPostRepo{
    find(id:string):Promise<Post>
    add(post:Post):Promise<string>
    remove(postId:string):Promise<void>
    list():Promise<Post[]>
}