import mongoose from "mongoose";
import bcrypt from "bcrypt"



const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    playerName: {
        type: String,
        required: true
    },
    playerUID: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "manager", "admin", "superadmin"],
        default: "user"
    },
    customUrls: [{
        linkName: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    passwordResetToken: String
}, { timestamps: true })


UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});


UserSchema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


export const User = mongoose.model("User", UserSchema);