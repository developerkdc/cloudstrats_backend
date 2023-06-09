import mongoose from "mongoose";
export const CustomerSchema = new mongoose.Schema({
    id: Number,
    name: String
}, { timestamps: true })

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer