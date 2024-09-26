import { IPostRepo } from "../interfaces/i-post-repo";
import { Post } from "../models/post";
import prisma from './db'
export class PrismaPostRepo implements IPostRepo
{
    async find(postId:string):Promise<Post>
    {
        return await prisma.post.findUnique({
            where : { id : postId}
        })
    }
    //add Post to the database, an post obviously always has to be linked to an existing user
    async add(post:Post):Promise<string>
    {
       
        const addedPost = await prisma.post.create({
            data : {
                title : post.title,
                content : post.content,
                date : post.date,
                author : {
                    connect : { id : post.author.id}
                },
               comments : {}
            }
            
        })

        return addedPost.id;
    }

    async remove(postId:string):Promise<void>
    {
        await prisma.post.delete({
            where : {
                id : postId
            }
        })
    }

    async list():Promise<Post[]>
    {
        return await prisma.post.findMany({})
    }

}