import { PrismaClient } from "@prisma/client";
import express, {Request,Response} from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

const client = new PrismaClient();

const userSchema = z.object({
  username : z.string().min(3),
  password : z.string().min(8),
  firstName : z.string().min(1),
  lastName : z.string().min(1),
})

const todoSchema = z.object({
  title : z.string().min(1),
  description : z.string().min(1),
  done : z.boolean().optional(),
})

app.post('/signup', async (req : Request, res : Response) => {
  try {
    const data = userSchema.parse(req.body);  
    const hashedPassword = await bcrypt.hash(data.password,10);

    await client.user.create({
      data : {...data, password : hashedPassword},
    })

    res.status(201).json({
      message : "User added successfully",
    })

  } catch (e) {
    res.status(400).json({
      message : "Error while adding the user",e
    })
  }

})

app.post('/todos', async (req : Request, res : Response) => {
  try {
    const data = todoSchema.parse(req.body);
    const userId = Number(req.query.userId);

    if(!userId) {
      res.status(400).json({message : "UserId is required"});
      return;
    }

    await client.todo.create({
      data : {...data, userId}
    })

    res.status(200).json({message : "todo created successfully"});
  } catch (e) {
     res.status(400).json({message : "Error while adding todod",e});
  }
})

app.listen(3000);