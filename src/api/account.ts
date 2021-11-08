import { Request, Response, Router } from "express";
import { genSaltSync, hash, compare } from "bcryptjs";
import * as jwt from "jsonwebtoken"
const router = Router();
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.get('/', (req, res) => {
    res.status(200).send("2")
})

router.post("/register", async (req: Request, res: Response) => {
    console.log("+++++++++++++++++++++++")
    const {
        username,
        password,
    } = req.body;

    const salt = genSaltSync(10);
    const hashedPassword = await hash(password, salt);

    try {
        const a = await prisma.user_login.create({
            data: {
                username: username,
                password: hashedPassword
            }
        })

        res.status(200).send(a)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            res.status(500).send(e)
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        throw e

    }

})

export default router;