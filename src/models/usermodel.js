import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
}, {
  timestamps: true,
  collection: "users" // explicitly use correct collection
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
