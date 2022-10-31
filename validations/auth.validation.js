import { body } from "express-validator"

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
        })
]

export const ValidationLogin = [
    body('email', "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "Password debe tener minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 })
]