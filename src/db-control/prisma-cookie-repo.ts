import { ICookie } from "../interfaces/i-cookie";
import { Cookie } from "../models/cookie";
import prisma from './db'

export class PrismaCookieRepo implements ICookie{

    async find(cookieId : string) : Promise<Cookie>{
        const foundCookie = await prisma.cookie.findUnique({
            where: {
                sessionId : cookieId
            }
        });
        return foundCookie;
    }

    async add(cookie : Cookie): Promise<string>{

        const foundCookie = await this.find(cookie.sessionId)

        if(!foundCookie){
            const addedCookie = await prisma.cookie.create({
                data : {
                    sessionId : cookie.sessionId,
                    email : cookie.email,
                    date : cookie.date
                }
            });
            return addedCookie.sessionId;
        }
        else{
            return null;
        }
    }
    async remove(email : string) : Promise<void>{
        const foundCookie = await prisma.cookie.delete({
            where : {
                email : email
            }
        });
    }
    async verify(cookieId : string) : Promise<boolean>{
        const foundCookie = await prisma.cookie.findUnique({
            where:{
                sessionId : cookieId
            }
        })
        if(foundCookie) return true;
        return false;
    }
}