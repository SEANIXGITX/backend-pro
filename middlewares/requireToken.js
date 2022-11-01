import jwt from "jsonwebtoken"

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

        const tokenVerificationErrors = {
            "invalid signature": "La escritura del token es incorrecta",
            "jwt malformed":"JWT no es un token",
            "jwt expired": "JWT token expirado",
            "invalid token": "Token no válido",
            "No Token": "No se ha enviado token, utiliza formato Bearer"
        }

        return res.status(401).send({ error: tokenVerificationErrors[error.message] })
    }
}