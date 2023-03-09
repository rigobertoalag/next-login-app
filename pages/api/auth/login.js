import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function loginHandler(req, res) {

    const { email, password } = req.body

    if (email === 'admin@mail.com' && password === '123') {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: 'admin@mail.com',
            username: 'admin'
        }, 'secret')

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })

        res.setHeader('Set-Cookie', serialized)
        return res.json('login success')
    }

    return res.status(401).json({ error: 'invalid email or password' })
}