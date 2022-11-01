import { User } from "../models/User.js"
import jwt from "jsonwebtoken"
import { generateRefreshToken, generateToken } from "../util/tokenManager.js"

export const register = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    try {
        // alternativa buscando por email
        let user = await User.findOne({ email })
        if (user) throw { code: 11000 }

        user = new User({ email, password })
        await user.save()
        // jwt
        return res.status(201).json({ register: true })
    } catch (error) {
        console.log(error)
        if (error.code == 11000) {
            return res.status(400).json({ error: "ya existe este usuario" })
        }
        return res.status(500).json({ error: "Error de servidor" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user)
            return res.status(403).json({ error: "No existe el usuario" })

        const respuestaPassword = await user.comparePassword(password)
        if (!respuestaPassword)
            return res.status(403).json({ error: "Contraseña incorrecta" })
        // Genera token jwt
        const { token, expiresIn } = generateToken(user._id)

        generateRefreshToken(user._id, res)

        return res.json({ token, expiresIn })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error de servidor" })
    }
}

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({ uid: user._id, email: user.email })
    } catch (error) {
        return res.status(500).json({ error: "error de servidor" })
    }
}
// refresh controller
export const refreshToken = (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken
        if (!refreshTokenCookie)
            throw new Error("No Token")

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH) //jwt.verify contiene la informacion uid, iat, exp
        const { token, expiresIn } = generateToken(uid)

        return res.json({ token, expiresIn })

    } catch (error) {
        console.log(error.message)

        const tokenVerificationErrors = {
            "invalid signature": "La escritura del token es incorrecta",
            "jwt malformed": "JWT no es un token",
            "jwt expired": "JWT token expirado",
            "invalid token": "Token no válido",
            "No Token": "No se ha enviado token, utiliza formato Bearer"
        }

        return res.status(401).send({ error: tokenVerificationErrors[error.message] })
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ ok: true })
}