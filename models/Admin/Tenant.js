import mongoose from "mongoose";
export const TenantSchema = new mongoose.Schema({
    id: Number,
    name: String
}, { timestamps: true })

const Tenant = mongoose.model("Tenant", TenantSchema);
export default Tenant