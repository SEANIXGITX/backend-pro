import express from "express"
import { login, register } from "../controllers/auth.controller.js"
import { body } from "express-validator"
import { validationResultExpress } from "../middlewares/validationResultExpress.js"

const router = express.Router()

router.post("/register", [
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
], validationResultExpress, register)
router.post("/login", login)

export default router