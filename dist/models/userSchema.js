import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
});
export const User = mongoose.model("User", userSchema);
