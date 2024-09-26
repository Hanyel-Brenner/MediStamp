import { IUserRepo } from "../interfaces/i-user-repo";
import { User } from "../models/user";

export class UserRepo implements IUserRepo{   //UserRepo is basically an array of users that  uses the interface IUserRepo
        
    public users:User[] = []

    async find(email:string):Promise<User>
    {
        return await this.users.find(user => user.email === email);
    }
    async add(user:User):Promise<string>
    {
        let newId = crypto.randomUUID()
        user.id = newId;
        this.users.push(user);
        return user.id;
        
    }
    async remove(email:string):Promise<void>
    {
        let index = this.users.findIndex(user => user.email == email);
        if( index != -1) {
            this.users.splice(index,1);
        }
    }
    async list():Promise<User[]>
    {
        return this.users;
    }

}