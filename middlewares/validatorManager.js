import { validationResult } from "express-validator"
import { body } from "express-validator"
import axios from "axios"

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors })
    }
    next()
}

export const ValidationRegister = [
    body('email', "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "Password debe tener minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    body('password', "formato de password incorrecto")
        .custom((value, { req }) => { //value es el valor de body, en este caso password
            if (value != req.body.repassword) {
                throw new Error("Las contraseñas no coinsiden")
            }
            return value
        }),
    validationResultExpress
]

export const ValidationLogin = [
    body('email', "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "Password debe tener minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress
]

export const ValidationCreateLink = [
    body("longLink", "formato link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value, { req }) => {
            // console.log(value)
            try {
                const incluyeHttps = value.startsWith("https://")
                if (incluyeHttps == false) {
                    value = "https://" + value
                }
                // console.log(value)
                await axios.get(value)
                return value
            } catch (error) {
                // console.log(error)
                throw new Error("No es un Link 404")
            }
        }),  // validamos con aaxios para saber si longLink es link real
    validationResultExpress
]