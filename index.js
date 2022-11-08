import "dotenv/config"
import "./database/connectdb.js"
import cors from "cors"
import express, { json } from 'express'
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
import linkRoute from "./routes/link.route.js"
import redirectRouter from "./routes/redirect.route.js"

const app = express()
//whiteList son todos los dominios aceptables por cors 
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]
app.use(cors({
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            return callback(null, origin)
        }
        return callback("Error de CORS origin: " + origin + "No autorizazdo!")
    },
    credentials: true
}))
//
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/links", linkRoute)
app.use("/", redirectRouter)
// app.use(express.static("public"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("*** SERVER ON PORT 5000 ***", "http://localhost:" + PORT))