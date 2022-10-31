import { Router } from "express"
import { login, register } from "../controllers/auth.controller.js"
import { ValidationRegister } from "../validations/auth.validation.js"
import { ValidationLogin } from "../validations/auth.validation.js"
import { validationResultExpress } from "../middlewares/validationResultExpress.js"

const router = Router()

router.post("/register", ValidationRegister, validationResultExpress, register)

router.post("/login", ValidationLogin, validationResultExpress, login)

export default router