import mongoose from "mongoose";
import validator from "validator";
export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Name"],
    min: 2,
    max: 50,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   max: 50,
  //   unique: true,
  //   validate: [validator.isEmail, "Please Enter A Valid Email"],
  // },
  // password: {
  //   type: String,
  //   required: [true, "Enter Password"],
  //   min: 5,
  //   select: false,
  // },
  role: {
    type: String,
    enum: ["ID", "OD", "JP"],
    required: [true, "Enter Privileges of user"],
    default:"ID"
  },
  thumbnail: {
    type: String,
    default: "",
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
