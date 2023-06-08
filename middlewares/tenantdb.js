import connect from "../config/db-connection.js";
import express from "express";
import mongoose from "mongoose";
import { UserSchema } from "../models/Tenant/User.js";
const url = "mongodb+srv://admin:admin@aediocluster.ks70beh.mongodb.net";
let db;

export const getTenantDB = async (tenantId) => {
  const dbName = `tenant-${tenantId}`;
  db = db ? db : await connect(url);
  let tenantDb = db.useDb(dbName, { useCache: true });
  return tenantDb;
};

export const getUserModelTenant = async (tenantId) => {
  const adminDb = await getTenantDB(tenantId);
  return adminDb.model("User", UserSchema);
};
