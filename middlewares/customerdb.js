// import connect from "../config/db-connection.js";
// import express from "express";
// import mongoose from "mongoose";
// import { UserSchema } from "../models/Customer/User.js";
// const url = "mongodb+srv://admin:admin@aediocluster.ks70beh.mongodb.net";
// let db;

// export const getCustomerDB = async (customerId) => {
//   const dbName = `customer-${customerId}`;
//   db = db ? db : await connect(url);
//   let customerDb = db.useDb(dbName, { useCache: true });
//   return customerDb;
// };

// export const getUserModelCustomer = async (customerId) => {
//   const adminDb = await getCustomerDB(customerId);
//   return adminDb.model("User", UserSchema);
// };

import connect from "../config/db-connection.js";
import express from "express";
import mongoose from "mongoose";
import { UserSchema } from "../models/Customer/User.js";
const url = "mongodb+srv://admin:admin@aediocluster.ks70beh.mongodb.net";
let connectionCache = {};

export const getCustomerDB = async (customerId) => {
  const dbName = `customer-${customerId}`;

  if (connectionCache[customerId]) {
    return connectionCache[customerId];
  }

  const db = await connect(url);
  const customerDb = db.useDb(dbName, { useCache: true });
  connectionCache[customerId] = customerDb;
  return customerDb;
};

export const getUserModelCustomer = async (customerId) => {
  const customerDb = await getCustomerDB(customerId);
  return customerDb.model("User", UserSchema);
};

      