import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  email: String,
});

export const User = mongoose.model("users", UserSchema);
