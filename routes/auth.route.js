import { Router } from "express"
import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controller.js"
import { requireToken } from "../middlewares/requireToken.js"
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js"
import { ValidationLogin, ValidationRegister } from "../middlewares/validatorManager.js"

const router = Router()

router.post("/register", ValidationRegister, register)

router.post("/login", ValidationLogin, login)

router.get("/protected", requireToken, infoUser)
// ruta para refrescar el token
router.get("/refresh", requireRefreshToken, refreshToken)
// 
router.get("/logout", logout)

export default router