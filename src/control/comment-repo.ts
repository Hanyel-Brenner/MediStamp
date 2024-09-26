import {Comment} from '../models/comment'

export class CommentRepo
{
    public comments:Comment[] = []

    async add(comment:Comment):Promise<string>
    {
        let newId = crypto.randomUUID()
        comment.id = newId;  //set id
        comment.date = new Date();  //set current date as date of creation
        this.comments.push(comment);
        return comment.id;
    }
    async remove(commentId:string):Promise<boolean>
    {
        let index = this.comments.findIndex(comment => comment.id == commentId);
        if( index != -1) {
            this.comments.splice(index,1);
            return true;
        }
        else return false
    }

    //this function recovers the comments of a given post from all the comments in the comments array of App object in app.ts
    /*async list(postId:string):Promise<Comment[]>
    {
        if(!postId) return this.comments

        let recoveredComments:Comment[];
        for(let i=0; i<this.comments.length; i++)
        {
            if(this.comments[i].postId == postId) recoveredComments.push(this.comments[i])
        }
        return recoveredComments;
    }*/

    async list():Promise<Comment[]>
    {   
        return this.comments;
    }
}