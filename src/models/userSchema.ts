import mongoose, { Schema, Model, Document } from "mongoose";

interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  image: string;
}

const userSchema: Schema<UserType> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
});

export const User: Model<UserType> = mongoose.model<UserType>(
  "User",
  userSchema
);
