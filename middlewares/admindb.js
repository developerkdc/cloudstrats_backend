import connect from "../config/db-connection.js";
import { CSUserSchema } from "../models/Admin/User.js";
import { CustomerSchema } from "../models/Admin/Customer.js";

const url =
  "mongodb+srv://admin:admin@aediocluster.ks70beh.mongodb.net/cloudstratAdmin";
let cachedDb;

const connectToDb = async () => {
  const db = await connect(url);
  return db;
};

const getDb = async () => {
  if (!cachedDb) {
    cachedDb = await connectToDb();
  }
  return cachedDb;
};

export const getCustomerModel = async () => {
  const adminDb = await getDb();
  return adminDb.model("Customer", CustomerSchema);
};

export const getUserModelAdmin = async () => {
  const adminDb = await getDb();
  return adminDb.model("CS_User", CSUserSchema);
};
