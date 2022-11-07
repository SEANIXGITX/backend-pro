import { User } from "../models/User.js"
import { generateRefreshToken, generateToken, tokenVerificationErrors } from "../util/tokenManager.js"

export const register = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    try {
        // alternativa buscando por email
        let user = await User.findOne({ email })
        if (user) throw { code: 11000 }

        user = new User({ email, password })
        await user.save()
        // genera token jwt
        const { token, expiresIn } = generateToken(user._id)

        generateRefreshToken(user._id, res)


        return res.status(201).json({ token, expiresIn })
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
        // return res.json({ ok: true })
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
        const { token, expiresIn } = generateToken(req.uid)
        return res.json({ token, expiresIn })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "error de servidor" })
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ ok: true })
}