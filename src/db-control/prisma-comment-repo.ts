import { ICommentRepo } from "../interfaces/i-comment-repo";
import prisma from './db'
import { Comment } from "../models/comment"

export class PrismaCommentRepo implements ICommentRepo
{

    async find(commentId:string):Promise<Comment>
    {
        return await prisma.comment.findUnique({
            where : {
                id : commentId
            }
        })
    }


    async add(comment:Comment):Promise<string>
    {
        let addedComment = await prisma.comment.create({
            data : {
                content : comment.content,
                date : comment.date,
                post : {
                    connect : {id : comment.post.id }
                },
                author : {
                    connect : {id : comment.author.id}
                } 
            }
        })
                return addedComment.id;
    }

    async remove(commentId:string):Promise<void>
    {
        await prisma.comment.delete({
            where : {id : commentId}
        })
    }

    //in this function you find all the comments from a single post
    async list(postId:string):Promise<Comment[]>
    {
        return await prisma.comment.findMany({
            where : {postId : postId}
        })
    }
}