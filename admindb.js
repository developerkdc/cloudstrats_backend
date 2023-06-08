import connect from "./db-connection.js";
import User, { UserSchema } from "./models/User.js";
import Tenant, { TenantSchema } from "./models/Tenant.js";
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
