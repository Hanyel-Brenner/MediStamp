import { Cookie } from "../models/cookie";

export interface ICookie{
    find(cookieId : string) : Promise<Cookie>;
    add(cookie : Cookie): Promise<string>;
    remove(email : string) : Promise<void>;
    verify(cookieId : string) : Promise<boolean>;
}