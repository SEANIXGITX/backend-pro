import { Router } from "express"
import { infoUser, login, register, refreshToken, logout} from "../controllers/auth.controller.js"
import { ValidationRegister } from "../validations/auth.validation.js"
import { ValidationLogin } from "../validations/auth.validation.js"
import { validationResultExpress } from "../middlewares/validationResultExpress.js"
import { requireToken } from "../middlewares/requireToken.js"

const router = Router()

router.post("/register", ValidationRegister, validationResultExpress, register)

router.post("/login", ValidationLogin, validationResultExpress, login)

router.get("/user", requireToken, infoUser)
// ruta para refrescar el token
router.get("/refresh", refreshToken)
// 
router.get("/logout", logout)

export default router