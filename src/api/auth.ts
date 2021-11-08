import { Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken"
const router = Router();
let refreshTokens: any = []

router.post('/token', (req: Request, res: Response) => {
    const refreshToken = req.body.token

    if (refreshToken == null) {
        return res.sendStatus(401)
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403)
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403)
        }

        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})
router.get('/', (req, res) => {
    res.status(200).send("aaaa")
})

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter((token: any) => token !== req.body.token)
    res.sendStatus(204)
})

router.post('/login', (req, res) => {
    // Authenticate User
    console.log(process.env)
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string)
    refreshTokens.push(refreshToken)
    console.log(refreshTokens)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

const generateAccessToken = (user: any) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15s' })
}

export default router;
