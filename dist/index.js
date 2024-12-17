"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.create({
            data: {
                title,
                description,
                userId
            }
        });
    });
}
createTodo(1, 'go to gym', 'go to gym and do 10 pushups');
