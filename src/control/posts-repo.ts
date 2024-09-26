import { Post } from "../models/post";

export class PostRepo{

    public posts:Post[] = [];

    async find(postId:string):Promise<Post>
    {
        return (this.posts || []).find(post => post.id == postId);
    }
    async add(post:Post):Promise<string>
    {
        let newId = crypto.randomUUID();
        post.id = newId;
        this.posts.push(post);
        return post.id;
    }
    async remove(postId:string):Promise<void>
    {
        let index = this.posts.findIndex(post => post.id == postId);
        if(index != -1){
            this.posts.splice(index,1);
        }
    }
    async list():Promise<Post[]>{
        return await this.posts;
    }
}
