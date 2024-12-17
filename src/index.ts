import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function insertUser (username : string, password : string, firstName : string, lastName : string) {
//   await prisma.user.create({
//     data : {
//       username,
//       password,
//       firstName,
//       lastName
//     }
//   })
// }

// insertUser('akh123',"chaudhary",'Akhil','kumar');

// async function updateUser (id : number, firstName : string, lastName : string) {
//   await prisma.user.update({
//     where : { id },
//     data : {
//       firstName,
//       lastName
//     }
//   })
// }

// updateUser(1,'Chetanya','chonkar');

async function createTodo (userId : number, title : string, description : string) {
  await prisma.todo.create({
    data : {
      title,
      description,
      userId
    }
  })
}

createTodo(1,'go to gym','go to gym and do 10 pushups');