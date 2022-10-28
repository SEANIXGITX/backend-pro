import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO) //la coneccion a mongodb es una promesa
    console.log("CONNECT DB OK")
} catch (error) {
    console.log("ERROR DE CONEXION A MONGODB:" + error)
}

