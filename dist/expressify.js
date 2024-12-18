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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = new client_1.PrismaClient();
const userSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(8),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
});
const todoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    done: zod_1.z.boolean().optional(),
});
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = userSchema.parse(req.body);
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        yield client.user.create({
            data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
        });
        res.status(201).json({
            message: "User added successfully",
        });
    }
    catch (e) {
        res.status(400).json({
            message: "Error while adding the user", e
        });
    }
}));
app.listen(3000);
