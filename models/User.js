import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

// const { Schema, model } = mongoose

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
    }
})

// interseptar los datos antes de gravarlos con el metodo pre() capturando el evento save
userSchema.pre("save", async function (next) {
    // obteniendo datos del schema
    const user = this
    // si se modifica otro dato diferente del password entonces pasa a guardar cambios
    if (!user.isModified("password")) return next()

    try {
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)
        next()
    } catch (error) {
        console.log(error)
        throw new Error("Fallo el hash de contraseña")
    }
})

userSchema.methods.comparePassword = async function (frontendPassword) {
    return await bcryptjs.compare(frontendPassword, this.password)
}

export const User = mongoose.model("User", userSchema)