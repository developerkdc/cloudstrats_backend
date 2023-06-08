import connect from "../config/db-connection.js";
import { UserSchema } from "../models/Tenant/User.js";
import  { TenantSchema } from "../models/Admin/Tenant.js";
const url =
  "mongodb+srv://admin:admin@aediocluster.ks70beh.mongodb.net/multitenantAdmin";
let db;

const getDb = async () => {
  return db ? db : await connect(url);
};

export const getTenantModel = async () => {
  const adminDb = await getDb();
  return adminDb.model("Tenant", TenantSchema);
};

export const getUserModelAdmin = async () => {
  const adminDb = await getDb();
  return adminDb.model("User", UserSchema);
};
