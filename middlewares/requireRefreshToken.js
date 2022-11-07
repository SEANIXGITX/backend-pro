import jwt from "jsonwebtoken"
import { tokenVerificationErrors } from "../util/tokenManager.js"

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken
        if (!refreshTokenCookie)
            throw new Error("No Token en cookie")

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH) //jwt.verify contiene la informacion uid, iat, exp

        req.uid = uid

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).send({ error: tokenVerificationErrors[error.message] })  
    }
}