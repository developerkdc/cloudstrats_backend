import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
export const CSUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Name"],
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    validate: [validator.isEmail, "Please Enter A Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Enter Password"],
    min: 5,
    select: false,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    required: [true, "Enter Role Of User"],
    default: "User",
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

CSUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const CSUser = mongoose.model("CS_User", CSUserSchema);
export default CSUser;
