import jwt from "jsonwebtoken"
import { tokenVerificationErrors } from "../util/tokenManager.js"

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization
        if (!token)
            throw new Error("No Token")

        token = token.split(" ")[1]

        const { uid } = jwt.verify(token, process.env.JWT_SECRET) //jwt.verify contiene la informacion uid, iat, exp

        req.uid = uid // se puede crear la propiedad request uid para enviarla a cualquier controlador que use este middleware

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).send({ error: tokenVerificationErrors[error.message] })
    }
}