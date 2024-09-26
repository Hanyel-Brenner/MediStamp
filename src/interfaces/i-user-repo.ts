import { User } from "../models/user"

export interface IUserRepo{
    find(email: string): Promise<User>
    add(user: User): Promise<string>
    remove(email: string): Promise<void>
    list(): Promise<User[]>
}