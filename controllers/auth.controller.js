import { User } from "../models/User.js"
import jwt from "jsonwebtoken"

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
        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET)

        res.json({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error de servidor" })
    }
}