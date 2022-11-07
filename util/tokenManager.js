import jwt from "jsonwebtoken"

export const generateToken = (uid) => {
    const expiresIn = 60 * 15 //quincec minutos
    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
        return { token, expiresIn }
    } catch (error) {
        console.console.log(error)
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30 // treinta días
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(new Date().getTime() + expiresIn * 1000), //milisegundos
            sameSite: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const tokenVerificationErrors = {
    "invalid signature": "La escritura del token es incorrecta",
    "jwt malformed": "JWT no es un token",
    "jwt expired": "JWT token expirado",
    "invalid token": "Token no válido",
    "No Token": "No se ha enviado token, utiliza formato Bearer"
}