import { IUserRepo } from '../interfaces/i-user-repo';
import { User } from '../models/user';
import prisma from './db'

export class PrismaUserRepo implements IUserRepo{
    
    
    async find(email:string):Promise<User>
    {
        let user = await prisma.user.findUnique({
          where : {
            email : email
          }
        })
          return user;
    }

    async add(user:User):Promise<string>
    {
      let foundUser = await prisma.user.findUnique({
        where : {email : user.email}
      }) 

      if(foundUser == null){

        const addedUser = await prisma.user.create({
          data:{
            nickname : user.nickname,
            email : user.email,
            password : user.password,
            posts : {},     //no posts are created at the time of creation of a user
            comments : {}
          }
        })

              return addedUser.id;
    }
    else return null
  }

    async remove(email:string):Promise<void>
    {
        await prisma.user.delete({
          where : {
            email : email
          }
        })
    }

    async list():Promise<User[]>
    {
      return await prisma.user.findMany({});
    }
}


/*import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      nickname: 'Rich',
      email: 'hello@prisma.com',
      password:'123',
      posts: {
        },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
*/