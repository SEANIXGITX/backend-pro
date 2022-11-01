import "dotenv/config"
import "./database/connectdb.js"
import express, { json } from 'express'
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"


const app = express()
// 
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoute)
app.use(express.static("public"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("*** SERVER ON PORT 5000 ***", "http://localhost:" + PORT))