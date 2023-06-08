import connect from "./db-connection.js";
import express from "express";
import mongoose from "mongoose";
import { UserSchema } from "./models/User.js";
const url = "mongodb+srv://admin:admin@aediocluster.ks70beh.mongodb.net";
let db;
const customerSchema = new mongoose.Schema(
  {
    customerName: String,
  },
  { timestamps: true }
);

const customerModel = mongoose.model("customers", customerSchema);

export const getTenantDB = async (tenantId) => {
  const dbName = `tenant-${tenantId}`;
  db = db ? db : await connect(url);
  let tenantDb = db.useDb(dbName, { useCache: true });
  return tenantDb;
};

export const getCustomerModel = async (tenantId) => {
  const tenantDb = await getTenantDB(tenantId);
  return tenantDb.model("customers", customerSchema);
};
export const getUserModelTenant = async (tenantId) => {
    const adminDb = await getTenantDB(tenantId);
    return adminDb.model("User", UserSchema);
  };
